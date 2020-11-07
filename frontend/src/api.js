import * as axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/v1/'

export const getImpressions = async () => {
  let result
  await axios.get(API_URL).then(res => {
    result = res.data
  })
  return result
}

export const addImpression = async (fields) => {
  await axios.post(API_URL, {author: 1, ...fields},)
}

export const removeImpression = async (impressionId) => {
  await axios.delete(API_URL+impressionId)
}