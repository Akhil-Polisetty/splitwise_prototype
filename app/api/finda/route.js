import susers from "@/models/susers";
import connectDB,{disconnectDB} from "@/source/db";
import { NextResponse } from "next/server";

export async function GET(){

    console.log("entered get request");
    try
    {    
           await connectDB();
           console.log("entered db connection");
        // const newUser=new susers({name,amount,date,time,status});
        try{
            const dat=await susers.find({});
            // console.log("the userdata is ",dat);
            // await newUser.save();
            await disconnectDB();
            return NextResponse.json({message:"fetched succesfull",status:201,data:dat});
        }
        catch(err){
            return NextResponse.json({message:'DB Fetching error'});
        }
    }
    
    catch(err)
    {
        console.log("there was an errror in the above part");
        return NextResponse.json({message:"Failed"},{status:500});
    }
}