import { useState, useEffect } from "react";
import { ActionsHash, ResourceItem } from "./types";

const ACTIONS_API_PATH = 'https://json.extendsclass.com/bin/42e6076482ec'
const RESOURCES_API_PATH = 'https://json.extendsclass.com/bin/7e8a0a720dcd';

export const useFetchActions = () => {
  const [items, setItimes] = useState<ActionsHash>({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  useEffect(() => {
    async function $fetcher() {
      setLoading(true);
      try {
        const response = await fetch(ACTIONS_API_PATH);
        if (!response.ok) {
          throw new Error('Response Error');
        }
        // response from api is malformed json - use curlies to fix it;
        const parsedResponse = JSON.parse(`{${await response.text()}}`).actions;
        if (!Array.isArray(parsedResponse)) {
          throw new Error('Response Parse Failed\n' + parsedResponse,);
        }
        setItimes(parsedResponse.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}))
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }
    $fetcher();
  }, [])
  return { items, isLoading: loading, error, hasError: !!error }
}

export const useFetchResources = () => {
  const [items, setItimes] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  useEffect(() => {
    async function $fetcher() {
      setLoading(true);
      try {
        const response = await fetch(RESOURCES_API_PATH);
        if (!response.ok) {
          throw new Error('Response Error');
        }
        // response from api is malformed json - use curlies to fix it;
        const parsedResponse = JSON.parse(`{${await response.text()}}`).resources;
        if (!Array.isArray(parsedResponse)) {
          throw new Error('Response Parse Failed\n' + parsedResponse,);
        }
        setItimes(parsedResponse)
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }

    $fetcher();
  }, [])
  return { items, isLoading: loading, error, hasError: !!error }
}