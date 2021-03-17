import axios from 'axios';

const GET = (options) => {
  return new axios({
    method: 'GET',
    data: {},
    ...options,
  })
}

const POST = (options) => {
  return new axios({
    method: 'POST',
    data: {},
    ...options,
  })
}

export function addGraph(options) {
  return POST({
    url: '/api/graph/add',
    headers: { "Content-Type": "multipart/form-data" },
    ...options,
  })
}

export function getGraphList(options) {
  return GET({
    url: '/api/graph/list',
    ...options,
  })
}

export function getGraphDetail(options) {
  return GET({
    url: '/api/graph/detail',
    ...options,
  })
}


export function deleteGraph(options) {
  return POST({
    url: '/api/graph/delete',
    ...options,
  })
}