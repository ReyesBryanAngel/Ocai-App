import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const loginUser = async (username, password) => {
    const response = await axios.post(`${baseUrl}/api/v1/login`, {
        username,
        password,
    });

    return response;
}

export const getUsers = async (accessToken) => {
    const response = await axios.get(`${baseUrl}/api/v1/getUsers`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      });

    return response;
}

export const addUser = async (accessToken, userData) => {
    const response = await axios.post(`${baseUrl}/api/v1/addUser`, {
        sectionId: userData?.sectionId,
        schoolId: userData?.schoolId,
        lastName: userData?.lastName,
        firstName: userData?.firstName,
        middleName: userData?.middleName,
        gender: userData?.gender,
        role: userData?.role,
        guardianName: userData?.guardianName,
        guardianContact: userData?.guardianContact,
        disability: userData?.disability,
        contactNumber: userData?.contactNumber,
        homeAddress: userData?.homeAddress,
        username: userData?.username,
        password: userData?.password,
        photo: userData?.photo,
        isArchived: userData?.isArchived
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        } 
    })

    return response;
}