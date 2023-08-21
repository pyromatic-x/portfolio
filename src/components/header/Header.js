function Header() {
  return (
    <header className="fixed top-0 left-0 w-full">
      <div className="container mx-auto px-8 py-6 flex justify-between w-full">
        <img alt="logo" src="qwe" />
        <div className="flex">
          <ul className="flex gap-14 me-8">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Experience</a>
            </li>
            <li>
              <a href="#">Contanct</a>
            </li>
          </ul>
          <div className="flex gap-4">
            <i>theme</i>
            <i>eng</i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
