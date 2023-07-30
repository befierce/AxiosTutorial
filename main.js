/*AXIOS global- can be used to send tockens when we have mutiple requests to make them all protective
 * here we are creating globals for tockens
*/
axios.defaults.headers.common['x*-Auth-Tocken'] = 'ewwsderfwedsnjhnuibdhbeubwfdfnrfenjwe';



  /*
GET REQUEST in basic way
function getTodos() {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/todos',
      params:{
        _limit:5
      }
    }).then((res) => {
      showOutput(res);
    }).catch((err) => {
      console.error(err); // Changed `error` to `err`
    });
  }
  */
function getTodos() {
  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeput: 5000})   /*   _limit = 5  : it limits the data we want to access   */
    .then(res => showOutput(res))/*when we request the todo it returns promise here we are catching the the promise and showing it in the browser
        we can console log it also if we dont wanna show it on the browser*/
    .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  // axios({
  //     method: 'post',
  //     url: 'https://jsonplaceholder.typicode.com/todos',
  //     data:{
  //         title: 'New Todo',
  //         completed: false
  //     }
  // }).then((res) => {
  //     showOutput(res);
  // }).catch((err) => {
  //     console.error(err); 
  // });
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// PUT/PATCH REQUEST
//put will replace the entire resourse(todo in this case) while patch will update the resource
function updateTodo() {
  axios
    .patch('https://jsonplaceholder.typicode.com/todos/1', {//here 1 is the id of todo to be updated
      title: 'update Todo',
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')// here 1 is the id of the todo to be deleted
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// SIMULTANEOUS DATA request
// what if we wanna get posts and totdos at the same time
function getData() {
  //we will use axios.all which will take array of requests
  // to fullfil our requests
  //it will return arrayof requests fullfilled
  //and then we can perform operations on then
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit =5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit = 5'),
  ])
  // .then(res => {
  //     console.log(res[0])   /** 0 its the  first argument(todos) result */
  //     console.log(res[1]) /** 1 it is the second argument(posts) result */
  //     showOutput(res[1]);
  // })
  // .catch(err => console.error(err))
  then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err))
}

// CUSTOM HEADERS
//Authentication
/**
 * here we are adding custom headers to our config object
 * and when we are posting our data  we are also passing,
 * config object here which can be used for authenticaion purposes
 */
function customHeaders() {
  const config = {
    headers: {/* here we are adding tokens to custom headers */
      'Content-Type': 'applicAtion/jsOn',
      Authorisation: 'sometocken'
    }
  };

  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false
    }, config)
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
/**
 * we can transform our default requests
 * the data we are sending will will converted to uppercase
 */
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos', 
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data =>{
      data.title = data.title.toUpperCase();
      return data
    })
  }
  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todosss') //modified the url so error must comea and the we will handle the error
  .then(res => showOutput(res))
  .catch(err => {
    //server responds with a stauts other than 200 range it means it is an error
    console.log(err.response.data);//error ka data
    console.log(err.response.status);//error ka status like 404 not found
    console.log(err.response.header);//error ka header
    if(err.response.status === 404){
      alert('Error: Page Not Found')
    }
  })
}

// CANCEL TOKEN
//cancel request on the fly
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
/*
 *  Axios is a popular JavaScript library used for making HTTP requests.
 *  It provides a convenient way to set up request and response interceptors,
 *  allowing you to modify requests or responses globally across your application.
 *  This is especially useful for handling authentication, error handling, or adding headers to requests. 
 * 
 */
axios.interceptors.request.use((config) => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url}
    ar ${new Date().getTime()}`);
  return config;
},
  error => {
    return Promise.reject(error)
  }
)
// AXIOS INSTANCES

const axiosInstance = axios.create({
  //other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
})

// axiosInstance.get('/comments').then(res => showOutput(res));








// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);