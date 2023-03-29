// initialize sequelize and sqlite3
const Sequelize = require("sequelize");
const config = require("../config.json");
const cooldownMs = config.cooldown_time_mins * 60000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  define: {
    freezeTableName: true,
  },
});

// create a table for cooldowns
const Cooldown = sequelize.define("Cooldown", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expiry: Sequelize.BIGINT,
});

// sync tables
sequelize.sync();

module.exports.addCooldown = async (id) => {
  if (!config.cooldown_enabled) return false;
  if (config.cooldown_whitelist.includes(id)) return false;

  const expiry = Date.now() + cooldownMs;

  await Cooldown.create({
    id: id,
    expiry: expiry,
  });
};

module.exports.getCooldown = async (id) => {
  if (!config.cooldown_enabled) return false;
  if (config.cooldown_whitelist.includes(id)) return false;

  let cooldown = await Cooldown.findOne({ where: { id: id } });
  if (!cooldown) return false;
  let cooldownStillValid = cooldown.expiry > Date.now();
  if (!cooldownStillValid) {
    await Cooldown.destroy({ where: { id: id } });
    return false;
  } else {
    return cooldown.expiry - Date.now();
  }
};
