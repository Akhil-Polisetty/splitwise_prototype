"use client";
import users from "@/source/data";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [uname, setUname] = useState("");
  const [uamount, setUamount] = useState(0);
  const [ustatus, setUstatus] = useState("");
  const [showhistory, setShowhistory] = useState(false);
  const [seluname, setSeluname] = useState("");
  const [selamount, setSelamount] = useState(0);
  const [seledamount, setSeledamount] = useState(0);
  const [history, setHistory] = useState([]);

  // State to manage the dialog visibility
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false);
  const [isEntryDialogOpen2, setIsEntryDialogOpen2] = useState(false);
  // const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  async function addNewUser() {
    console.log(uname, uamount, ustatus);
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: uname,
          amount: uamount,
          status: ustatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register user");
      }
      const result = await res.json();
      console.log("User registered successfully:", result);
      setIsUserDialogOpen(false); // Close user dialog after adding
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  function handleAdd(user)
  {
    setIsEntryDialogOpen(true);
    setSeluname(user.name);
    setSelamount(user.amount);
  }
  
  function handleRemove(user)
  {
    setIsEntryDialogOpen2(true);
    setSeluname(user.name);
    setSelamount(user.amount);
  }


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/api/finda");
        const result = await response.json();
        setUsers(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);
  console.log("the users are", users);

  // Function to handle adding a new entry
  const handleAddEntry = async () => {
    // console.log("Adding entry with amount:", amount, "and description:", description);
    // console.log(uname, uamount, udate, utime, ustatus);
    try {
      const res = await fetch("http://localhost:3000/api/addamount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sname: seluname,
          samount:Number(selamount),
          eamount: Number(seledamount),
          desc:description

        }),
      });

      if (!res.ok) {
        throw new Error("Failed to Update user");
      }
      const result = await res.json();
      console.log("Updated successfully:", result);
      setIsUserDialogOpen(false); // Close user dialog after adding
    } catch (error) {
      console.error("Error registering user:", error);
    }
    setIsEntryDialogOpen(false); // Close entry dialog after adding
    // Add additional logic here, e.g., API call to add entry
  };


  const handleHistory = async (user) => {
    setShowhistory(true);
    try {
      const res = await fetch(`http://localhost:3000/api/gethistory?name=${user.name}`, {
        method: "GET",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch history");
      }
  
      const result = await res.json();
      setHistory(result.history); // Set the history data to state
      alert('success');
      console.log(history);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleRemoventry = async () => {
 
    try {
      const res = await fetch("http://localhost:3000/api/remamount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sname: seluname,
          samount:Number(selamount),
          eamount: Number(seledamount),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to Update user");
      }
      const result = await res.json();
      console.log("Updated successfully:", result);
      setIsEntryDialogOpen2(false); // Close user dialog after adding
    } catch (error) {
      console.error("Error registering user:", error);
    }
    setIsEntryDialogOpen2(false); // Close entry dialog after adding
    // Add additional logic here, e.g., API call to add entry
  };


  return (
    <div className="w-screen h-screen bg-yellow-100 flex flex-col gap-4 justify-center items-center">
      <div className="w-96 p-6 bg-green-100 border-solid flex flex-col gap-3 justify-center align-center border-2 border-sky-300">
        <div>Splitwise</div>
        <div>A simple expense tracking app</div>
      </div>

      <div className=" p-4 border-solid border-2 border-green-400">
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className="m-3 p-7 bg-amber-100 flex justify-around gap-2 border-2 border-solid border-purple-600"
            >
              <div>{user.name}</div>
              <div>{user.amount}</div>
              <div>{user.status}</div>
              <div>{user.date}</div>
              <div>{user.time}</div>
              <div onClick={() => handleAdd(user) } className="cursor-pointer p-1.5 bg-green-400">Add</div>
              <div onClick={() => handleRemove(user)} className="bg-red-400 p-1.5 cursor-pointer" >Remove</div>
              <div onClick={()=> handleHistory(user)} className="bg-yellow-200 p-1.5 cursor-pointer" >History</div>
            </div>
          );
        })}
      </div>

      {/* User Dialog Box for Adding New User */}
      {isUserDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold">Add New User</h2>
            <input
              type="text"
              placeholder="Name"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              className="block mb-2 border p-1"
            />
            <input
              type="text"
              placeholder="Amount"
              value={uamount}
              onChange={(e) => setUamount(e.target.value)}
              className="block mb-2 border p-1"
            />
            <input
              type="text"
              placeholder="Status"
              value={ustatus}
              onChange={(e) => setUstatus(e.target.value)}
              className="block mb-2 border p-1"
            />
            <button onClick={addNewUser} className="bg-blue-500 text-white p-2 rounded mr-2">
              Submit
            </button>
            <button onClick={() => setIsUserDialogOpen(false)} className="bg-red-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Entry Dialog Box for Adding New Entry */}
      {isEntryDialogOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold">Remove New Entry</h2>
            <input
              type="text"
              placeholder="Amount"
              value={seledamount}
              onChange={(e) => setSeledamount(e.target.value)}
              className="block mb-2 border p-1"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block mb-2 border p-1"
            />
            <button onClick={handleRemoventry} className="bg-blue-500 text-white p-2 rounded mr-2">
              Submit
            </button>
            <button onClick={() => setIsEntryDialogOpen2(false)} className="bg-red-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {isEntryDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold">Add New Entry</h2>
            <input
              type="text"
              placeholder="Amount"
              value={seledamount}
              onChange={(e) => setSeledamount(e.target.value)}
              className="block mb-2 border p-1"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block mb-2 border p-1"
            />
            <button onClick={handleAddEntry} className="bg-blue-500 text-white p-2 rounded mr-2">
              Submit
            </button>
            <button onClick={() => setIsEntryDialogOpen(false)} className="bg-red-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}


      {
        showhistory && (
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2>History Details</h2>
            <button onClick={()=> setShowhistory(false)}>cancel</button>
            {history.map((entry, index) => {
              return (
                <>
                <div
                  key={index}
                  className="m-3 p-2 bg-amber-100 flex justify-around gap-2 border-2 border-solid border-purple-600"
                >
                  <div>{entry.hamount}</div>
                  <div>{entry.description}</div>
                  <div>{entry.hdate}</div>
                  <div>{entry.htime}</div>
                  
                </div>
                </>
              );
            })}
          </div>
        )
      }

      <div className="w-96 bg-slate-500 mt-4 pb-9">
        <p onClick={() => setIsUserDialogOpen(true)} className="cursor-pointer">
          Add new user
        </p>
      </div>
    </div>
  );
}
