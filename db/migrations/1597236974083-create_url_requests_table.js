require("../../models");

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Migration to add default requests (demo purpose)
  const requests = [
    {
      id: 1,
      url: "https://proxify.io",
      status: "NEW",
      http_code: null,
      updated_at: new Date(),
      created_at: new Date(),
    },
    {
      id: 2,
      url: "https://proxify.io",
      status: "NEW",
      http_code: null,
      updated_at: new Date(),
      created_at: new Date(),
    },
  ];

  await this("requests").collection.insertMany(requests);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Drop requests table to undo migration
  await this("requests").collection.drop();
}

module.exports = { up, down };
