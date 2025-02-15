import { supabase } from "./supabase";

export const fetchHeritages = async() => {
    const { data, error } = await supabase.from("heritages").select("*");

    console.log("取得データ:", data);
    console.log("エラー:", error); 
    
    if (error) {
        console.error("Supabase データ取得エラー", error.message);
        return [];
    }
    
    return data;
};