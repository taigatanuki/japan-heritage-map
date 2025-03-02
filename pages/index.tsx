import { useEffect, useState } from "react";
import { fetchHeritages } from "../utils/fetchHeritages";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

type Heritage = {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    imageUrl: string;
}

export default function Home() {
    const [heritages, setHeritages] = useState<Heritage[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);// 現在選択されている世界遺産のIDを保存
    console.log("最初のデータ：", heritages);

    useEffect(() => {
        const loadHeritages = async () => {
            const data = await fetchHeritages();
            console.log("取得したデータ：", data);
            setHeritages(data);
        };
        loadHeritages();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                日本の世界自然遺産
            </h1>
            <div className="w-full max-w-4xl h-96 bg-white rounded-lg overflow-hidden border border-gray-300">
                <Map heritages={heritages} selectedId={selectedId} setSelectedId={setSelectedId} />
            </div>
            <div className="w-full max-w-4xl rounded-lg bg-white shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">遺産リスト</h2>
                <ul className="space-y-3">
                    {heritages.map((heritage) => (
                        <li key={heritage.id} onClick={() => setSelectedId(heritage.id)} className={`p-4 rounded-lg shadow-sm border flex items-center space-x-4 cursor-pointer transition ${selectedId === heritage.id ? "bg-blue-200 border-blue-400" : " bg-blue-50 border-blue-200"}`}>
                            <Image src={heritage.imageUrl} alt={heritage.name} width={80} height={50}  />
                            <div>
                                <p className="text-lg font-medium text-blue-800">{heritage.name}</p>
                                <p className="text-sm text-gray-600">{heritage.address}</p>
                                <Link 
                                    href={`/heritage/${heritage.id}`} 
                                    className="text-blue-500 hover:underline"
                                    onClick={(e) => {
                                        // 親要素<li> の onClick で選択IDがセットされるのを防ぐ
                                        e.stopPropagation();
                                        // ページ遷移前に selectedId をリセットして地図アニメーションを止める
                                        setSelectedId(null);
                                      }}
                                >
                                    詳細を見る
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}