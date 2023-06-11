<template>
    <aside class="sidebar-aside">
      <div class="header">
        <h1>VatroAlarm</h1>
        <h1>Administration</h1>
      </div>
      <nav>
        <ul>
          <li class="active">
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/vehicles">Vehicles</router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
  </script>
  
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }
  .sidebar-aside .header {
    background: #f5f5f5;
    padding: 10px 35px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
    text-align: center;
  }
  .sidebar-aside {
    background: #fff;
    overflow-y: auto;
    border-right: 1px solid #e5e5e5;
    flex: 0 0 260px;
  }
  .sidebar-aside ul li a {
    display: block;
    padding: 16px 25px;
    border-bottom: 1px solid #03374e;
    color: #0e94d4;
  }
  .sidebar-aside ul li a .icon {
    font-size: 18px;
    color: white;
    vertical-align: middle;
  }
  
  .sidebar-aside ul li a .text {
    margin-left: 19px;
    color: #fff;
    font-size: 18px;
    letter-spacing: 2px;
  }
  .sidebar-aside ul li a:hover {
    background: #0e94d4;
    color: #fff;
  }
  </style>