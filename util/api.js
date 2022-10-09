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

  const getList = async (url, params) => {
    return new Promise(async (resolve) => {
      const res = await request({
        url,
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

  const getModels = async (params) => {
    return await getList(`${ENDPOINT}/models`, params);
  };

  const getMakeTypes = async (params) => {
    return await getList(`${ENDPOINT}/make-types`, params);
  };

  const getFaceParts = async (params) => {
    return await getList(`${ENDPOINT}/face-parts`, params);
  };

  // アドバイスは顔パーツからidだけ渡す
  const getAdvices = async (params) => {
    const result = await getList(`${ENDPOINT}/advices?populate=%2A`, params);
    const data = result.data.map((item) => {
      const { id, text, face_part } = item;
      return {
        id,
        text,
        face_part_id: face_part.data.id
      };
    });
    return {
      data
    };
  };

  const getModel = async (id) => {
    return new Promise(async (resolve) => {
      const res = await request({
        url: `${ENDPOINT}/models/${id}?populate=%2A`,
        // url: `${ENDPOINT}/models/${id}`,
        method: "GET",
        params: null
      });

      if (!res.result) {
        alert(res.message);
        resolve(null);
      }

      //adviceをidにする
      const advice = res.data.attributes.advice.data.map((item) => item.id);
      const make_type = res.data.attributes?.make_type?.data?.id;

      resolve({
        ...res,
        data: { id: res.data.id, ...res.data.attributes, make_type, advice }
      });
    });
  };

  return {
    getModels,
    getMakeTypes,
    getFaceParts,
    getAdvices,
    getModel
  };
};

export const api = _api();
