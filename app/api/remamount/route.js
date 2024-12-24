import susers from "@/models/susers";
import connectDB,{disconnectDB} from "@/source/db";
import { NextResponse } from "next/server";

export async function POST(req){
    console.log("entered post request");
    console.log("The received request is ",req);
    try
    {
        const {sname,samount,eamount}=await req.json();
        console.log("The data is ",sname,samount,eamount);
        await connectDB();
        console.log("entered db connection");
        try{

            const result = await susers.updateOne(
                { name: sname }, // Query to find the user by name
                { $set: { amount: samount-eamount } } // Update operation to set the new amount
              );
          
              if (result.modifiedCount === 1) {
                console.log(`Successfully updated the amount for user: ${name}`);
              } else {
                console.log(`No user found with the name: ${name}`);
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