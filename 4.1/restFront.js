async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;
        
    }
}