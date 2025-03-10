import Edital from "@/domain/entities/edital";
import { SearchBar } from "../components/searchbar";
import FilterSection from "../sections/noticefilter";
import { useEffect, useState } from "react";
import EditalCard from "@/components/editalcard";
import LoginModal from "@/components/loginmodal";

export default function NoticeList(){
    const [editais, setEditais] = useState<Edital[]>([])
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen)
    }

    const fetchEditais = async () => {
        try {
            const res = await fetch("/api/editais");
            if (!res.ok) throw new Error('Failed to fetch editais');
            
            const data = await res.json();
            
            const transformedData = data.map((edital: any) => ({
                ...edital,
                icon: edital.iconurl,
                sponsor: {
                    name: edital.sponsor,
                
                },
       
                sdgs: edital.sdgs,
                causes: edital.causes,
                skills: edital.skills
            }));
            
            setEditais(transformedData);
        } catch (error) {
            console.error('Error fetching editais:', error);

        }
    };

    useEffect(() => {
        fetchEditais();
      }, []);


    return (
        <div className="flex flex-col">
            <div className="h-screen">
            {/* Navbar */}
            <div className="absolute w-full h-14 text-white bg-pcr flex px-4 justify-between place-items-center">
                <img
                className="size-28 object-contain" 
                src="https://i.postimg.cc/sxsV4N4p/Horizontal-Branco-2021.png" />
                <span className="font-extrabold">
                    Acompanhamento de editais
                </span>

                <button onClick={toggleLogin}>
                    Fazer login     
                </button>

                {isLoginOpen && <LoginModal/>}

            </div>

            <div className="flex flex-col h-screen w-full flex-1">
                {/* Barra de pesquisa */}
                <div className="w-full h-1/4 justify-center items-center flex pt-12 gap-4   ">
                    <img
                    className="size-28 object-contain" 
                    src="https://i.postimg.cc/VkrcnwPx/bora-impactar.png"></img>
                    <SearchBar/>
                </div>

                <div className="flex flex-1 ml-12">
                    {/* Listagem dos editais */}
                    <div className="overflow-y-auto flex items-center flex-col gap-3 bg-slate-200 rounded-lg w-3/4 h-[500px] py-4">
                    {editais.map((edital) => {

                        return (
                        <EditalCard
                            key={edital.id}
                            title={edital.title}
                            description={edital.description}
                            icon={edital.icon}
                            sponsor={edital.sponsor.name}
                        />
                        );
                    })
                    }
                    </div>

                    {/* Opções de filtro */}
                    <div className="w-1/4 text-slate-700 font-bold">
                        <FilterSection/>
                    </div>
                </div>
                
                
            </div >
            </div>
            
        
            <div className="w-full h-14 text-white bg-pcr flex px-4 justify-start flex-1 gap-4 place-items-center">
                <a href="https://portal.cin.ufpe.br/" target="blank">
                <img
                className="object-contain size-28" 
                src="https://i.postimg.cc/W4d6s9r6/HMB.png"></img>
                </a>
                <span>Esse site é uma iniciativa do projeto CIn-Bora Impactar em parceria com a Prefeitura de Recife</span>
            </div>
        </div>

        
    )
}
