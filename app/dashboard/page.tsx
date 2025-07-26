import Link from "next/link";

export default function DashHome(){
    return(
        <div className="dash-container">
            <div className="flex-row">
                <div className="side-bar bg-black flex-column text-white w-70 h-[100vh] items-center justify-center">
                    <div className="logo text-bold text-base text-center font-bold">Admin logo</div>
                    <Link href='/item'>
                        <div className="side-bar-item bg-white rounded-sm w-[90%] text-center text-black px-4 py-2">
                            Item
                        </div>
                    </Link>

                    <Link href='/item'>
                        <div className="side-bar-item bg-white rounded-sm w-[90%] text-center text-black px-4 py-2">
                            Post
                        </div>
                    </Link>

                    <Link href='/item'>
                        <div className="side-bar-item bg-white rounded-sm w-[90%] text-center text-black px-4 py-2">
                            Users
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}