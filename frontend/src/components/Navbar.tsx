import { Link } from "react-router"

const Navbar = () => {
  return (
    <div className="bg-red-100">
      Navbar
      <button>
      <Link to={"/add"}>ADD items</Link>
      </button>
      <button>
      <Link to={"/"}>Home</Link>
      </button>
    </div>
  )
}

export default Navbar
