import menupermissionmaster from "../../db/models/menupermissionmaster.js";

export const getmenuPermission=async(req,res)=>{
    try {
        const newmenuPer=await menupermissionmaster.findAll({isActive:true})
        if(!newmenuPer)
            {
                return res.status(400).json({
                    status:0,
                    message:"Menu Permission not found"
                });
            }
            return res.status(200).json({
                status:1,
                message:"Get the list of menu permission",
                data:newmenuPer
            })
        
    } catch (error) {
        return res.status(500).json({
            status:0,
            message:"Internal Server Error"
        });
        
    }
}

export const  createMenuPermission=async(req,res)=>{
    try {
        const{submenuid,userid,isview,isedit,isadd}=req.body;
        const newmenuPer = await menupermissionmaster.create({
            submenuid:submenuid,
            userid:userid,
            isadd:isadd,
            isedit:isedit,
            isview:isview
            
        })
        if(!newmenuPer)
            {
                return res.status(400).json({
                    status:0,
                    message:"Failed to create the permission"
                });
            }
            return res.status(201).json({
                status:1,
                message:"Menu permission created successfully!",
                data:newmenuPer
            })
    } catch (error) {
        return res.status(500).json({
            status:0,
            message:"Internal server error"
        })
        
    }
}
    
