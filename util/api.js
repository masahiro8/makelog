import { ENDPOINT } from "/constants/config";

const ERROR = {
  result: false,
  message: null
};

const SUCCESS = {
  result: true,
  data: null,
  pagenation: null
};

const _api = () => {
  const request = ({ url, method, params }) => {
    return new Promise((resolve) => {
      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
          // "Cache-Control": "no-cache"
        }
      })
        .then(async (res) => {
          if (!res.ok) {
            resolve({
              ...ERROR,
              message: "正常にリクエストを処理できませんでした。"
            });
          }
          const { data, meta } = await res.json();
          // const { page, pageSize, pageCount, total } = meta?.pagination;
          resolve({
            ...SUCCESS,
            data: data,
            pagenation: meta?.pagination
          });
        })
        .catch((error) => {
          resolve({
            ...ERROR,
            message: "エラーが発生しました。"
          });
        });
    });
  };

  const getModels = async (params) => {
    return new Promise(async (resolve) => {
      const res = await request({
        url: `${ENDPOINT}/models`,
        method: "GET",
        params: null
      });

      if (!res.result) {
        alert(res.message);
        resolve(null);
      }
      resolve({
        ...res,
        data: res.data.map((item) => {
          return {
            id: item.id,
            ...item.attributes
          };
        })
      });
    });
  };

  const getModel = async (id) => {
    return new Promise(async (resolve) => {
      const res = await request({
        url: `${ENDPOINT}/models/${id}?populate=%2A`,
        method: "GET",
        params: null
      });

      if (!res.result) {
        alert(res.message);
        resolve(null);
      }
      resolve({
        ...res,
        data: { id: res.data.id, ...res.data.attributes }
      });
    });
  };

  return {
    getModels,
    getModel
  };
};

export const api = _api();
