import susers from "@/models/susers";
import connectDB,{disconnectDB} from "@/source/db";
import { NextResponse } from "next/server";

export async function POST(req){
    console.log("entered post request");
    console.log("The received request is ",req);
    try
    {
        const {sname,samount,eamount,desc}=await req.json();
        console.log("The data is ",sname,samount,eamount,desc);
        await connectDB();
        const dt=new Date();
        const hdate=dt.toLocaleDateString();
        const htime=dt.toLocaleTimeString();
        console.log("entered db connection");
        try{

          const result = await susers.findOneAndUpdate(
            { name:sname }, // Find user by name
            {
                $inc: { amount: eamount },
                $push: {
                    history: {
                        hamount:eamount,
                        description:desc,
                        hdate,
                        htime
                    }
                }
            },
            { new: true } // Return the updated document
        );
              if (result) {
                console.log(`Successfully updated the amount for user: ${sname}`);
              } else {
                console.log(`No user found with the name: ${sname}`);
              }
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