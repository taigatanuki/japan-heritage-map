import { useEffect, useState } from "react";
import { fetchHeritages } from "../utils/fetchHeritages";

type Heritage = {
    id: number;
    name: string;
    address: string;
}

export default function Home() {
    const [heritages, setHeritages] = useState<Heritage[]>([]);
    console.log(heritages);

    useEffect(() => {
        const loadHeritages = async () => {
            const data = await fetchHeritages();
            console.log(data);
            setHeritages(data);
        };
        loadHeritages();
    }, []);

    return (
        <div>
            <h1>日本の世界自然遺産</h1>
            <ul>
                {heritages.map((heritage) => (
                    <li key={heritage.id}>
                        {heritage.name} ({heritage.address})
                    </li>
                ))}
            </ul>
        </div>
    );
}