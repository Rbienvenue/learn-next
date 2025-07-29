import Link from "next/link";

export default function Sidebar(){
    return(
        <div className="dash-container bg-gray-800 text-white w-64 flex flex-col h-screen">
            <div className="nav-header text-center">
                <h1 className="nav-title font-extrabold text-xl">Dashboard</h1>
            </div>
            <div className="nav-items flex flex-col p-4">
              <Link href={"/dashboard/item"}>
                <div className="nav-item bg-white text-black justify-center hover:bg-gray-200 p-3 rounded-lg flex mb-2">
                    <span className="nav-icon">📦</span>
                    <span className="nav-text">Items</span>
                </div>
              </Link>
              <Link href={"/dashboard/posts"}>
                <div className="nav-item bg-white text-black justify-center hover:bg-gray-200 p-3 rounded-lg flex mb-2">
                    <span className="nav-icon">🏷️</span>
                    <span className="nav-text">Posts</span>
                </div>
              </Link>
              <Link href={"/dashboard/item"}>
                <div className="nav-item bg-white text-black justify-center hover:bg-gray-200 p-3 rounded-lg flex mb-2">
                    <span className="nav-icon">📦</span>
                    <span className="nav-text">Items</span>
                </div>
              </Link>
              <Link href={"/dashboard/item"}>
                <div className="nav-item bg-white text-black justify-center hover:bg-gray-200 p-3 rounded-lg flex mb-2">
                    <span className="nav-icon">📦</span>
                    <span className="nav-text">Items</span>
                </div>
              </Link>
            </div>
        </div>
    )
}