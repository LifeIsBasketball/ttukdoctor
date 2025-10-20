import { IonPage, useIonRouter,IonContent } from "@ionic/react";
import { BackButton, Button, CloseButton } from "../beta_app/Buttons";
import {  getDocs, doc, getDoc, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useIonViewWillEnter } from "@ionic/react"; // 추가
import { useEffect, useState } from "react";
import { db, auth } from "../config/firebaseConfig";
import { useParams } from "react-router-dom";
import "../beta_app/Layout.css"
import { Title } from "../beta_app/Title";
import { Beta } from "../beta_app/Beta";
import { GarageCard } from "../beta_app/GarageCard";

interface Quote {
    id: string;
    start: string;
    imgSrc: string;
    plateNumber: string;
    modelName: string;
    repairMethod: string;
    location: string;
    requestType: string;
    errorType: string;
    quoteCount?: number;
}

interface QuoteOffer {
    id: string;
    eta: {
        day: number;
        hour: number;
    }
    cost: number;
    repairDetail: string;
}

  

const Status2: React.FC = () => {
    const router = useIonRouter();
    const [quote, setQuote] = useState<Quote|null>(null);
    const [quoteOffers, setQuoteOffers] = useState<QuoteOffer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { docId } = useParams<{ docId: string }>();

    const hardCodedData = [
        {
            title: "OO건설기계정비",
            distance: 5.3,
            location: '대구 안심로 13길 OOO',
            hashTag: ['굴삭기', '전자제어엔진', '유압펌프']
        },
        {
            title: "XX건설기계정비 ",
            location: '대구 방촌 7-3 OOO',
            distance: 7.2,
            hashTag: ['유압펌프', '경력 15년']
        },
        {
            title: "OO유압전문건설기계정비",
            location: '경산 백천동 571-2',
            distance: 21.4,
            hashTag: ['굴삭기', '판금', '외장']
        },
        {
            title: "00굴삭기전문정비",
            location: "대구 동구 동내로 45길 17",
            distance: 18.2,
            hashTag: ['굴삭기', '유압실린더', '배관누유']
        },
        {
            title: "OO제일건설기계정비",
            location: "대구 북구 침산남로 33",
            distance: 13.9,
            hashTag: ['굴삭기','지게차', '전기계통', '정밀수리']
        },
        {
            title: "@@건설굴삭기기계정비",
            location: "경산 진량읍 공단4로 91",
            distance: 25.6,
            hashTag: ['굴삭기', '전자제어엔진', '유압펌프']
        }
]

    useIonViewWillEnter(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
            console.log("❌ 로그인된 사용자 없음");
            setIsLoggedIn(false);
            setIsLoading(false);
            return;
            }

            console.log("✅ 로그인된 사용자:", user.uid);
            setIsLoggedIn(true);
            setIsLoading(true);

            try {
            const docRef = doc(db, "QuoteRequests", docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setQuote({
                    id: data.id,
                    start: data.start,
                    imgSrc: data.mediaUrl || "/crane.png",
                    plateNumber: data.plateNumber,
                    modelName: data.modelName,
                    repairMethod: data.repairMethod,
                    location: data.location,
                    requestType: data.requestType,
                    errorType: data.errorType,
                    quoteCount: data.quoteCount,
                })
            }
            } catch (err) {
            console.error("❌ 견적 불러오기 실패:", err);
            } finally {
            setIsLoading(false);
            }
        });

    return () => unsubscribe(); // cleanup
    });

    useEffect( () => {
        const fetchQuoteOffers = async () => {
            try {
                const q = query(
                    collection(db, "QuoteOffers"),
                    where("quoteRequestId", "==", docId)
                );
                const snapshot = await getDocs(q);
                const results: QuoteOffer[] = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                    id: doc.id,
                    eta: data.ETA,
                    cost: data.cost,
                    repairDetail: data.repairDetail
                    };
                });
                setQuoteOffers(results);
            } catch (err) {
            console.error("❌ 견적 불러오기 실패:", err);
            } finally {
            setIsLoading(false);
            }
        }
        
        fetchQuoteOffers();
    }, [docId]);

    return (
        <IonPage>
            <IonContent>
            <div style={{gap: '8px' }} className="container" >
                <div style={{ width: '100%', height:'56px', display: 'flex', flexDirection: 'row', justifyContent:"space-between"}} > 
                    <BackButton onClick={() => router.goBack()} />
                    <CloseButton onClick={() => router.push('/tabs/home')}/>
                </div>
                
                <div  style={{display: 'flex', flexDirection: 'column', gap: '8px'}}> {/*헤더 div*/}
                    <Title fontSize ={28} content="받은 견적" />
                    {
                    isLoading ? (
                        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <Beta title="로딩중 ..." content="잠시만 기다려주세요 :)"/>
                        </div>
                        ) : !isLoggedIn && (
                        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <Beta title="로그인이 필요해요!" content="견적을 확인 하기 위해서는 우선 로그인을 해주세요 :)"/>
                            <Button content="로그인 하기" color='orange' onClick={() => router.push('/login')}/>
                        </div>
                        )
                    }
                    

                    
                    {/*상단 장비 정보 */
                    quote && (
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{width: '70%', display: 'flex', flexDirection: 'column', gap: '8px'}}>

                            <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                    {quote.plateNumber}
                                </span>{' '}
                                <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                    {quote.modelName}
                                </span>
                            </div>

                            <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                    {'요청 위치'}-
                                </span>{' '}
                                <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                    {quote.location}
                                </span>
                            </div>

                            <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                <span style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                    {quote.requestType}-
                                </span>{' '}
                                <span style={{color: '#454A4D', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '120%'}}>
                                    {quote.errorType}
                                </span>
                            </div>
                        </div>

                        <img style={{width: 96, height: 96, borderRadius: 8, border: '0.50px #7A7D7F solid'}} 
                        src={quote.imgSrc} />
                    </div>
                    )}
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                {/*제시된 견적 리스트*/
                quoteOffers.map((q,idx) => (
                    <GarageCard 
                    id = {q.id}
                    cost = {q.cost}
                    title={hardCodedData[idx].title} 
                    distance={hardCodedData[idx].distance} 
                    address={hardCodedData[idx].location} 
                    imgSrc={""}   
                    hashTag={hardCodedData[idx].hashTag}  
                    onClick={() => router.push(`/status3/${q.id}`)}               
                    />
                ))
                }
                </div>
                


            </div>
            </IonContent>
        </IonPage>
    );
};

export default Status2;

