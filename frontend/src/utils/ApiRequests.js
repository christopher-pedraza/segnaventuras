import axios from "axios";

/*
EJEMPLOS DE USO:

=================================================================GET=======================================================================

import React, { useState, useEffect } from 'react';
import { get } from './Database';

function MyComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get('data', () => setIsLoading(false), () => setIsLoading(false));
        setData(result);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>CARGADO!!</div>
    );
  }

export default MyComponent;

=================================================================POST=======================================================================

import React, { useState, useEffect } from 'react';
import { post } from './Database';

function MyComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postData = async () => {
      try {
        const result = await post('data', { name: 'John' }, () => setIsLoading(false), () => setIsLoading(false));
        setData(result);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    postData();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>CARGADO!!</div>
  );
}

export default MyComponent;
*/

const defaultURL = "http://localhost:3000/";

async function apiRequest(
    method,
    url,
    data = null,
    successActions = () => {},
    errorActions = () => {}
) {
    try {
        const options = {
            method,
            url: defaultURL + url,
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            },
        };

        if (data !== null) {
            options.data = data;
        }

        const response = await axios(options);

        successActions();
        return response.data;
    } catch (error) {
        errorActions();
        throw error;
    }
}

/**
 * GET
 * @param {*} url dirección a la que se hará la petición
 * @param {string} url dirección a la que se hará la petición
 * @param {function} successActions función que se ejecutará si la petición es exitosa
 * @param {function} errorActions función que se ejecutará si la petición falla
 * @returns la respuesta de la petición
 */
export function get(url, successActions = () => {}, errorActions = () => {}) {
    return apiRequest("GET", url, null, successActions, errorActions);
}

/**
 * POST
 * @param {string} url dirección a la que se hará la petición
 * @param {Object} data información que se enviará en la petición
 * @param {function} successActions función que se ejecutará si la petición es exitosa
 * @param {function} errorActions función que se ejecutará si la petición falla
 * @returns la respuesta de la petición
 */
export function post(
    url,
    data,
    successActions = () => {},
    errorActions = () => {}
) {
    return apiRequest("POST", url, data, successActions, errorActions);
}

/**
 * PUT
 * @param {string} url dirección a la que se hará la petición
 * @param {Object} data información que se enviará en la petición
 * @param {function} successActions función que se ejecutará si la petición es exitosa
 * @param {function} errorActions función que se ejecutará si la petición falla
 * @returns la respuesta de la petición
 */
export function put(
    url,
    data,
    successActions = () => {},
    errorActions = () => {}
) {
    return apiRequest("PUT", url, data, successActions, errorActions);
}

/**
 * DELETE
 * @param {string} url dirección a la que se hará la petición
 * @param {function} successActions función que se ejecutará si la petición es exitosa
 * @param {function} errorActions función que se ejecutará si la petición falla
 * @returns la respuesta de la petición
 */
export function del(url, successActions = () => {}, errorActions = () => {}) {
    return apiRequest("DELETE", url, null, successActions, errorActions);
}
