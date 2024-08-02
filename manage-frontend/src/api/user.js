import request from '@/utils/request'
import emptyAvatar from '@/assets/images/empty_avatar.jpg'

/**
 * 获取用户自身信息
 */
export function getInfo() {
  return request.get('user-api/users/me')
}

/**
 * 获取用户自身头像
 * @returns {avatarUrl}
 */
export function getAvatar() {
  return new Promise((resolve, reject) => {
    request({
      url: 'user-api/users/me/avatar',
      method: 'get',
      responseType: 'blob'
    }).then(response => {
      resolve(generateAvatarUrl(response))
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取用户头像
 * @param {number} userId
 * @returns {avatarUrl}
 */
export function getUserAvatar(userId) {
  return new Promise((resolve, reject) => {
    request({
      url: `user-api/users/${userId}/avatar`,
      method: 'get',
      responseType: 'blob'
    }).then(response => {
      resolve(generateAvatarUrl(response))
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取用户列表
 * @param {Object} data {userName, minCreateTime, maxCreateTime, orderBy, orderMethod, pageNum, pageSize}
 * @returns users
 */
export function getUsers(data) {
  const params = new URLSearchParams(data)
  const url = `user-api/users?${params.toString()}`
  return request.get(url)
}

/**
 * 更新用户头像
 * @param {number} userId
 * @param {File} file
 */
export function updateUserAvatar(userId, file) {
  const url = 'user-api/users/' + userId + '/avatar'
  const formData = new FormData()
  formData.append('avatar', file)
  return request.put(url, formData)
}

/**
 * 删除用户
 * @param {list} userIds
 */
export function deleteUsers(userIds) {
  const url = 'user-api/users?ids=' + userIds.join(',')
  return request.delete(url)
}

/**
 * 修改用户状态
 * @param {number} userId
 * @param {number} status
 */
export function changeUserStatus(userId, status) {
  const url = `user-api/users/${userId}/status?status=${status}`
  return request.put(url)
}

/**
 * 添加用户
 * @param {Object} data {userName, trueName, password, email, phone, gender, address, introduction, roleIds}
 */
export function addUser(data) {
  return request.post('user-api/users', data)
}

/**
 * 更新用户信息
 * @param {Object} data {id, userName, trueName, email, phone, gender, address, introduction, roleIds}
 */
export function updateUser(data) {
  return request.put('user-api/users', data)
}

function generateAvatarUrl(response) {
  if (response.status === 204) {
    return emptyAvatar
  }
  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: 'image/jpg' })
  )
  return url
}

