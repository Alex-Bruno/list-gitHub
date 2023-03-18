import axios from './Api';

export const getRepositories = async (filter) => {
  const query = getQueryByFilter(filter);

  const response = await axios.get('/search/repositories', {
    params: {
      q: query,
      sort: 'name',
      order: filter.order ? filter.order : 'asc'
    }
  })

  return await getLastCommitter(response);
}

const getQueryByFilter = filter => {
  let query = `user:${process.env.REACT_APP_API_REPOSITORY} `
  if (filter) {
    if (filter.name) {
      query = query + `${filter.name} in:name `
    }

    if (filter.archived !== undefined && filter.archived !== 'undefined') {
      query = query + `archived:${filter.archived === '1' ? 'true ' : 'false '}`
    }

    if (filter.min_star && filter.max_star) {
      query = query + `stars:${filter.min_star}..${filter.max_star} `
    } else {
      if (filter.min_star) {
        query = query + `stars:>=${filter.min_star} `
      }

      if (filter.max_star) {
        query = query + `stars:<=${filter.max_star} `
      }
    }

    if (filter.start_date && filter.end_date) {
      query = query + `created:${filter.start_date}..${filter.end_date} `
    } else {
      if (filter.start_date) {
        query = query + `created:>=${filter.start_date} `
      }

      if (filter.end_date) {
        query = query + `created:<=${filter.end_date} `
      }
    }
  }

  return query.trim();
}

const getLastCommitter = async (response) => {
  return await Promise.all(
    response.data.items.map(async repository => {
      const lastCommit = await axios.get(`repos/${repository.full_name}/commits?sort:committer-date-asc&per_page=1`)

      const committer = (lastCommit?.data) ? lastCommit?.data[0].commit.committer.date : ''
      repository['last_committer'] = committer;
      return repository;
    })
  );
}