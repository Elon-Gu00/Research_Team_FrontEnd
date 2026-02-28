/**
 * @Author: Gyl
 * @Date: 2026-02-05 16:25:04
 * @LastEditors: Gyl
 * @LastEditTime: 2026-02-07 15:27:22
 * @Description:
 */

export const queryDataType = (data) => Object.prototype.toString.call(data).slice(8, -1);

export const checkNullValue = (val) => {
  const dataType = queryDataType(val);

  switch (dataType) {
    case 'String':
    case 'Array':
      return val.length <= 0;
    case 'Object':
      return Object.keys(val).length <= 0;
    case 'Null':
    case 'Undefined':
      return true;
  }

  return false;
};

export const getUid = (length = 32, radix = null) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const uid = [];
  radix = radix || chars.length;

  for (let i = 0; i < length; i++) {
    uid[i] = chars[0 | (Math.random() * radix)];
  }

  return uid.join('');
};

/**
 * 正则匹配密码：8-16位且含数字、大小写字母、特殊字符[~!@#$%^&*_]
 * @param val 需校验的数据
 * @returns 校验结果
 */
export const validatePassword = (val) => {
  if (!val) return false;

  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_])[\da-zA-Z~!@#$%^&*_]{8,16}$/.test(val);
};

/**
 * 正则匹配邮箱格式
 * @param val 需校验的数据
 * @returns 校验结果
 */
export const validateEmail = (val) => {
  if (!val) return false;

  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
};

/**
 * 严格验证邮箱格式（限制常见域名）
 * @param val 需校验的数据
 * @returns 校验结果
 */
export const validateEmailStrict = (val) => {
  if (!val) return false;

  return /^(?!.*[._%+-]{2})[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,}$/.test(val);
};

/**
 * 文件下载工具函数
 * @param {string} fileName - 要下载的文件名
 * @param {string} [customName] - 自定义下载后的文件名（可选）
 */
export const downloadFile = async (fileName, customName) => {
  try {
    const response = await api_download(fileName);

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = downloadUrl;
    link.download = customName || fileName;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    }, 100);
  } catch (error) {
    console.error('下载失败:', error);
    throw error;
  }
};
