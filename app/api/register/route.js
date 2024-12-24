import susers from "@/models/susers";
import connectDB,{disconnectDB} from "@/source/db";
import { NextResponse } from "next/server";

export async function POST(req){
    console.log("entered post request");
    // console.log("The received request is ",req);
    try
    {
        const {name,amount,status}=await req.json();
        await connectDB();
        console.log("entered db connection");
        console.log("The received data is ",name,amount,status);
        const dt=new Date();
        console.log(typeof(dt));
        const date=dt.toLocaleDateString();
        const time=dt.toLocaleTimeString();
        console.log(name,amount,date,time,status)
        const newUser=new susers({name,amount,date,time,status});
        console.log("The added data is ",newUser);
        try{

            await newUser.save();
            await disconnectDB();
        }
        catch(err){
            return NextResponse.json({message:'DB creation error'});
        }
        return NextResponse.json({message:'User added successfully'},{status:200});
    }
    
    catch(err)
    {
        console.log("there was an errror in the above part");
        return NextResponse.json({message:"Failed"},{status:500});
    }
}