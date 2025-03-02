import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Link from "next/link";
import Image from "next/image";

type Heritage = {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    imageUrl: string;
}

export default function HeritageDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [heritage, setHeritage] = useState<Heritage | null>(null);

    useEffect(() => {
        if(!id) return;

        const fetchHeritage = async() => {
            const { data, error } = await supabase
                .from("heritages")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                console.error("データ取得エラー：", error.message);
            } else {
                setHeritage(data);
            }
        };
        
        fetchHeritage();
    }, [id]);

    if (!heritage) {
        return <p className="text-center text-gray-500">データを読み込んでいます...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-blue-700">{heritage.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{heritage.address}</p>

            <div className="w-full max-w-2xl h-96 bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 mt-6 relative">
                <Image src={heritage.imageUrl} alt={heritage.name} fill className="object-cover"/>
            </div>

            <Link href="/" className="mt-6 text-blue-500 hover:underline">
                ⬅ トップに戻る
            </Link>
        </div>
    );
}