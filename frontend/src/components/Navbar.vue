<template>
  <aside class="menu-sidebar">
    <div class="header">
      <h1>VatroAlarm</h1>
      <h1>Administration</h1>
    </div>
    <nav>
      <ul>
        <li class="active">
          <a href="chart.html">
            Vozila
          </a>
        </li>
        <li>
          <a href="table.html">
            ...
          </a>
        </li>
        <li>
          <a href="form.html">
            ...
          </a>
        </li>
        <li>
          <a href="#">
            ...
          </a>
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
.menu-sidebar .header {
  background: #f5f5f5;
  padding: 10px 35px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
  text-align: center;
}
.menu-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  overflow-y: auto;
  border-right: 1px solid #e5e5e5;
}
.menu-sidebar ul li a {
  display: block;
  padding: 16px 25px;
  border-bottom: 1px solid #03374e;
  color: #0e94d4;
}
.menu-sidebar ul li a .icon {
  font-size: 18px;
  color: white;
  vertical-align: middle;
}

.menu-sidebar ul li a .text {
  margin-left: 19px;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
}
.menu-sidebar ul li a:hover {
  background: #0e94d4;
  color: #fff;
}
</style>