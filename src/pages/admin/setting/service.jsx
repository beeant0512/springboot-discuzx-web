import request from '@/utils/request';

export async function basic() {
  return request('/api/common/setting/basic');
}

export async function update(params) {
  return request('/api/common/setting/update', {
    method: 'POST',
    data: params,
  });
}
