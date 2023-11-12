import GetRandomMeal from "./api/GetRandomMeal";
import searchPng from './assets/search-interface-symbol.png'
function App() {

  return (
    //app box
    <div className=" min-h-screen flex items-center justify-center flex-col bg-gray-200">
      <div className=" shadow-[5px_5px_40px_1px_#a0aec0] rounded-lg w-[400px] bg-gray-100">
        <div className=" px-10 py-10 flex justify-center items-center">
          <input className="shadow-[rgba(0,_0,_0,_0.24)_4px_3px_15px_4px] px-3 py-1 rounded-sm outline-none" />
          <button>
            <img src={searchPng} className=" w-7 ml-5" />
          </button>
        </div>
        <div className="p-8">
          <GetRandomMeal />
        </div>
      </div>
    </div>
  );
}

export default App
