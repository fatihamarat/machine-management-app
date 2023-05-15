// Functions
import { fetchData } from './functions.js';

const machinesTable = document.getElementById('machines');
const productsTable = document.getElementById('products');
const detailsTable = document.getElementById('details');

const render = async () => {
  // create a fake api call via axios library to the promise function fetchData
  const fetchDataWithAxios = await axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then((_response) => {
      return fetchData();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log('error', error);
    });

  let database = fetchDataWithAxios;

  let groups = database?.data?.groups || [];

  // Generate Bootstrap modal
  const generateModal = (title, body, footer) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'block';

    // Close modal
    window.closeModal = () => {
      modal.style.display = 'none';
      modal.remove();
    };

    modal.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            ${title ? `<h5 class="modal-title" id="modal-title">${title}</h5>` : ''}
            <button type="button" class="close" onclick='closeModal()' data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="close-btn" >&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${body}
          </div>
          <div class="modal-footer">
            ${footer}
          </div>
        </div>
      </div>
    `;
    return modal;
  };

  // Render machines table
  const generateMachinesTable = () => {
    const table = document.createElement('table', { id: 'machines-table' });
    const tbody = document.createElement('tbody');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>ID</th>
      <th>Name</th>
      <th>Group ID</th>
      <th>Description</th>
      <th>Actions</th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Edit machine
    window.editMachine = (id) => {
      const machine = (groups?.map((group) => group?.machines).flat() || []).find(
        (machine) => machine?.id === id
      );
      const modal = generateModal(
        'Edit Machine',
        `
        <form id="edit-machine-form">
          <div class="form-group">
            <label for="machine-name">Name</label>
            <input type="text" class="form-control" id="machine-name" value="${machine?.name}" />
          </div>
          <div class="form-group">
            <label for="machine-group-id">Group ID</label>
            <select class="form-control" id="machine-group-id">
              ${groups
                ?.map(
                  (group) => `
                  <option value="${group?.id}" ${
                    group?.id === machine?.groupId ? 'selected' : ''
                  }>${group?.name}</option>
                `
                )
                .join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="machine-description">Description</label>
            <input type="text" class="form-control" id="machine-description" value="${
              machine?.description
            }" />
          </div>
        </form>
      `,
        `
        <button type="submit" class="btn btn-primary" onclick="updateMachine(${machine?.id})">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
      `
      );
      document.body.appendChild(modal);
    };

    // Edit submit machine
    window.updateMachine = async (id) => {
      const name = document?.getElementById('machine-name')?.value || '';
      let groupId = document?.getElementById('machine-group-id')?.value || '';
      const description = document?.getElementById('machine-description')?.value || '';

      console.log({ name, groupId, description, id, groups });
      groups = groups.map((group) => {
        group.machines = group.machines.map((machine) => {
          if (machine.id === id) {
            machine.name = name;
            machine.groupId = groupId;
            machine.description = description;
          }
          return machine;
        });
        return group;
      });

      closeModal();
      generateProductsTable();
      generateDetailsTable();
      generateMachinesTable();
    };

    // Delete machine
    window.deleteMachine = async (id) => {
      const machine = (groups?.map((group) => group?.machines).flat() || []).find(
        (machine) => machine?.id === id
      );
      const modal = generateModal(
        'Delete Machine',
        `
        <p>Are you sure you want to delete this machine?</p>
        <p>ID: ${machine?.id}</p>
        <p>Name: ${machine?.name}</p>
        <p>Group ID: ${machine?.groupId}</p>
        <p>Description: ${machine?.description}</p>
      `,
        `
        <button type="submit" class="btn btn-danger" onclick="deleteMachineFromDatabase(${machine?.id})">Delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
      `
      );
      document.body.appendChild(modal);
    };

    // Delete machine from database
    window.deleteMachineFromDatabase = async (id) => {
      groups = groups.map((group) => {
        group.machines = group.machines.filter((machine) => machine.id !== id);
        return group;
      });

      closeModal();
      generateProductsTable();
      generateDetailsTable();
      generateMachinesTable();
    };

    // Add machine
    window.createMachine = () => {
      const modal = generateModal(
        'Add Machine',
        `
        <form id="add-machine-form">
          <div class="form-group">
            <label for="machine-name">Name</label>
            <input type="text" class="form-control" id="machine-name" />
          </div>
          <div class="form-group">
            <label for="machine-group-id">Group ID</label>
            <select class="form-control" id="machine-group-id">
              ${groups
                ?.map(
                  (group) => `
                  <option value="${group?.id}">${group?.name}</option>
                `
                )
                .join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="machine-description">Description</label>
            <input type="text" class="form-control" id="machine-description" />
          </div>
        </form>
      `,
        `
        <button type="submit" class="btn btn-primary" onclick="addMachine()" >Add Machine</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
      `
      );
      document.body.appendChild(modal);
    };

    // Add machine to database
    window.addMachine = async () => {
      const name = document?.getElementById('machine-name')?.value || '';
      const groupId = document?.getElementById('machine-group-id')?.value || '';
      const description = document?.getElementById('machine-description')?.value || '';

      groups = groups.map((group) => {
        if (group.id == groupId) {
          console.log({ group });
          const newMachine = {
            id: parseInt((Math.random() * 1000).toString().split('.')[0]),
            name,
            groupId: parseInt(groupId),
            description,
            products: []
          };
          console.log({ newMachine });
          group.machines.push(newMachine);
        }
        return group;
      });

      closeModal();
      generateProductsTable();
      generateDetailsTable();
      generateMachinesTable();
    };

    // Create table body
    (groups?.map((group) => group?.machines).flat() || []).forEach((machine) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${machine?.id}</td>
        <td>${machine?.name}</td>
        <td>${machine?.groupId}</td>
        <td>${machine?.description}</td>
        <td>
          <button class="btn btn-primary" onclick="editMachine(${machine?.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteMachine(${machine?.id})">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Add footer includes add machine button
    const tfoot = document.createElement('tfoot');
    const footerRow = document.createElement('tr');
    footerRow.innerHTML = `
      <td colspan="5">
        <button class="btn btn-success" onclick='createMachine()'>Add Machine</button>
      </td>
    `;
    tfoot.appendChild(footerRow);
    table.appendChild(tfoot);

    machinesTable.innerHTML = '';
    machinesTable.appendChild(table);
  };

  // Render products table
  const generateProductsTable = () => {
    const table = document.createElement('table', { id: 'products-table' });

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const tbody = document.createElement('tbody');

    // Create table header
    headerRow.innerHTML = `
          <th>ID</th>
          <th>Name</th>
          <th>Group ID</th>
          <th>Description</th>
          <th>Actions</th>
        `;

    // Edit product
    window.editProduct = (id) => {
      const product = (
        groups
          ?.map((group) => group?.machines)
          .flat()
          .map((machine) => machine?.products)
          .flat() || []
      ).find((product) => product?.id === id);
      const modal = generateModal(
        'Edit Product',
        `
        <form id="edit-product-form">
          <div class="form-group">
            <label for="product-name">Name</label>
            <input type="text" class="form-control" id="product-name" value="${product?.name}" />
          </div>
          <div class="form-group">
            <label for="product-machine">Machine</label>
            <select class="form-control" id="product-machine">
              ${groups
                ?.map((group) => group?.machines)
                .flat()
                .map(
                  (machine) => `
                  <option value="${machine?.id}" ${
                    machine?.id === product?.machine ? 'selected' : ''
                  }>${machine?.name}</option>
                `
                )
                .join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="product-description">Description</label>
            <input type="text" class="form-control" id="product-description" value="${
              product?.description
            }" />
          </div>
        </form>
      `,

        `
        <button type="submit" class="btn btn-primary" onclick="updateProduct(${product?.id})">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
      `
      );
      document.body.appendChild(modal);
    };

    // Edit submit product
    window.updateProduct = async (id) => {
      const name = document?.getElementById('product-name')?.value || '';
      const machine = document?.getElementById('product-machine')?.value || '';
      const description = document?.getElementById('product-description')?.value || '';

      groups = groups.map((group) => {
        group.machines = group.machines.map((item) => {
          item.products = item.products.map((product) => {
            if (product.id === id) {
              product.name = name;
              product.machine = parseInt(machine);
              product.description = description;
            }
            return product;
          });
          return item;
        });
        return group;
      });

      closeModal();
      generateProductsTable();
      generateMachinesTable();
      generateDetailsTable();
    };

    // Delete product
    window.deleteProduct = async (id) => {
      const product = (
        groups
          ?.map((group) => group?.machines)
          .flat()
          .map((machine) => machine?.products)
          .flat() || []
      ).find((product) => product?.id === id);
      const modal = generateModal(
        'Delete Product',
        `
        <p>Are you sure you want to delete this product?</p>
        <p>ID: ${product?.id}</p>

        <p>Name: ${product?.name}</p>
        <p>Machine: ${product?.machine}</p>
        <p>Description: ${product?.description}</p>
      `,
        `
        <button type="submit" class="btn btn-danger" onclick="deleteProductFromDatabase(${product?.id})">Delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
      `
      );
      document.body.appendChild(modal);
    };

    // Delete product from database
    window.deleteProductFromDatabase = async (id) => {
      groups = groups.map((group) => {
        group.machines = group.machines.map((item) => {
          item.products = item.products.filter((product) => product.id !== id);
          return item;
        });
        return group;
      });

      closeModal();
      generateProductsTable();
      generateMachinesTable();
      generateDetailsTable();
    };

    // Add product
    window.addProduct = () => {
      const modal = generateModal(
        'Add Product',
        `
        <form id="add-product-form">
          <div class="form-group">
            <label for="product-name">Name</label>
            <input type="text" class="form-control" id="product-name" />
          </div>
          <div class="form-group">
            <label for="product-machine">Machine</label>
            <select class="form-control" id="product-machine">
              ${groups
                ?.map((group) => group?.machines)
                .flat()
                .map(
                  (machine) => `
                  <option value="${machine?.id}">${machine?.name}</option>
                `
                )
                .join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="product-description">Description</label>
            <input type="text" class="form-control" id="product-description" />
          </div>
        </form>
      `,
        `
        <button type="submit" class="btn btn-primary" onclick="addProductToDatabase()" >Add Product</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
      `
      );
      document.body.appendChild(modal);
    };

    // Add product to database
    window.addProductToDatabase = async () => {
      const name = document?.getElementById('product-name')?.value || '';
      const machine = document?.getElementById('product-machine')?.value || '';
      const description = document?.getElementById('product-description')?.value || '';

      groups = groups.map((group) => {
        group.machines = group.machines.map((item) => {
          if (item.id == machine) {
            const newProduct = {
              id: parseInt((Math.random() * 1000).toString().split('.')[0]),
              name,
              machine: parseInt(machine),
              description
            };
            item.products.push(newProduct);
          }
          return item;
        });
        return group;
      });

      closeModal();
      generateProductsTable();
      generateDetailsTable();
      generateMachinesTable();
    };

    // Re-initialize database
    window.reInitializeDatabase = async () => {
      const modal = generateModal(
        'Re-initialize Database',
        `
        <p>Are you sure you want to re-initialize the database?</p>
      `,
        `
        <button type="submit" class="btn btn-danger" onclick="reInitializeDatabaseFromDatabase()">Re-initialize</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
      `
      );
      document.body.appendChild(modal);
    };

    // Re-initialize database from database
    window.reInitializeDatabaseFromDatabase = async () => {
      location.reload();

      closeModal();
    };

    (
      groups
        ?.map((group) => group?.machines)
        .flat()
        .map((machine) => machine?.products)
        .flat() || []
    ).map((product) => {
      const id = product?.id;
      const name = product?.name;
      const machine = product?.machine;
      const description = product?.description;

      // Create table body
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${id}</td>
          <td>${name}</td>
          <td>${machine}</td>
          <td>${description}</td>
          <td>
            <button class="btn btn-primary" onclick="editProduct(${id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button>
          </td>
        `;
      tbody.appendChild(row);
    });

    // Create table footer
    const tfoot = document.createElement('tfoot');
    const footerRow = document.createElement('tr');
    footerRow.innerHTML = `
              <td colspan="5">
                <button class="btn btn-success" onclick='addProduct()' >Add Product</button>
              </td>
            `;
    tfoot.appendChild(footerRow);
    table.appendChild(tfoot);
    thead.appendChild(headerRow);

    table.appendChild(thead);
    table.appendChild(tbody);
    productsTable.innerHTML = '';
    productsTable.appendChild(table);
  };

  // Generate details table
  const generateDetailsTable = () => {
    // console.log('generate details table', productsData, machinesData);
    const table = document.createElement('table', { id: 'details-table' });

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const tbody = document.createElement('tbody');

    // Create table header
    headerRow.innerHTML = `
          <th>Machine ID</th>
          <th>Product ID's</th>
          <th>Product Total Quantity</th>
        `;

    // Create table body with products data and machines data
    (groups?.map((group) => group?.machines).flat() || []).map((machine) => {
      const machineId = machine?.id;
      const products = machine?.products;
      const productIds = products?.map((product) => product?.id);
      const productTotalQuantity = products?.reduce(
        (total, product) => total + product?.quantity || 1,
        0
      );

      // Create table body
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${machineId}</td>
          <td>${productIds}</td>
          <td>${productTotalQuantity}</td>
        `;
      tbody.appendChild(row);
    });

    // Create table footer
    const tfoot = document.createElement('tfoot');
    const footerRow = document.createElement('tr');
    footerRow.innerHTML = `
              <td colspan="3">
                <button class="btn btn-success" onclick='reInitializeDatabase()'>Re-initialize Database</button>
              </td>
            `;
    tfoot.appendChild(footerRow);
    table.appendChild(tfoot);

    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    detailsTable.innerHTML = '';
    detailsTable.appendChild(table);
  };

  generateMachinesTable();
  generateProductsTable();
  generateDetailsTable();
};

render();
