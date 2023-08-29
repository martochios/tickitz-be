const db = require("../database")

const getAll = async (keyword, sortType) => {
  try {
    let query
    if (keyword != null) {
      query =
        await db`SELECT *, count(*) OVER() AS full_count FROM movies WHERE LOWER(movies.title) LIKE LOWER(${keyword}) ORDER BY id ${sortType}`
    } else {
      query =
        await db`SELECT *, count(*) OVER() AS full_count FROM movies ORDER BY id ${sortType}`
    }
    return query
  } catch (error) {
    return error
  }
}

const getById = async (id) => {
  try {
    const query = await db`SELECT * FROM movies where id = ${id}`
    return query
  } catch (error) {
    return error
  }
}

const getByCategory = async (category, sortType) => {
  try {
    const query =
      await db`SELECT *, count(*) OVER() AS full_count FROM movies WHERE LOWER(category) LIKE LOWER(${category}) ORDER BY id ${sortType}`
    return query
  } catch (error) {
    return error
  }
}

const create = async (payload) => {
  try {
    const query = await db`INSERT INTO movies ${db(
      payload,
      "title",
      "movies_picture",
      "price",
      "description",
      "category",
      "duration",
      "director",
      "cast",
      "release_date"
    )} returning *`
    return query
  } catch (error) {
    return error
  }
}

const update = async (payload, id) => {
  try {
    const query = await db`UPDATE movies SET ${db(
      payload,
      "title",
      "price",
      "description",
      "category",
      "duration",
      "director",
      "cast",
      "release_date"
    )} WHERE id = ${id} returning *`
    return query
  } catch (error) {
    return error
  }
}

const updatePhoto = async (payload, id) => {
  try {
    const query = await db`UPDATE movies SET ${db(
      payload,
      "movies_picture"
    )} WHERE id = ${id} returning *`
    return query
  } catch (error) {
    return error
  }
}

const deletemovies = async (id) => {
  try {
    const query = await db`DELETE FROM movies WHERE id = ${id} returning *`
    return query
  } catch (error) {
    return error
  }
}

module.exports = {
  getAll,
  getById,
  getByCategory,
  create,
  update,
  deletemovies,
  updatePhoto,
}