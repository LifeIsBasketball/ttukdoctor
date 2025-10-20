import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { BackButton, Button, CloseButton, RightArrowButton } from "../beta_app/Buttons";
import {  getDocs, doc, getDoc, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useIonViewWillEnter } from "@ionic/react"; // 추가
import { useEffect, useState } from "react";
import { db, auth } from "../config/firebaseConfig";
import { useParams } from "react-router-dom";
import "../beta_app/Layout.css"
import { SubTitle, Title } from "../beta_app/Title";
import { Beta } from "../beta_app/Beta";
import { GarageCard } from "../beta_app/GarageCard";
import "../beta_app/CardButton/style.css"
import "./Status3.css"
import { DetailedVehicleCard } from "../beta_app/VehicleCard";

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

const Status4: React.FC = () => {
    const router = useIonRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { docId } = useParams<{ docId: string }>();
    const [quote, setQuote] = useState<Quote|null>(null);

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
    
            return () => unsubscribe(); // cleanup
        });
    });

   
    return (
        <IonPage>
            <IonContent>
                <div  className="container" >
                    <div style={{width: '100%', height:'64px', display: 'flex', flexDirection: 'row', justifyContent:"space-between"}} > 
                        <BackButton onClick={() => router.goBack()} />
                        <CloseButton onClick={() => router.push('/tabs/home')}/>
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px'}} className="content" >
                        <Title fontSize={28} content="정비가 매칭되었어요 :)" />
                        <SubTitle fontSize={16} content="정비소에서 연락이 올거에요! 잠시만 기다려주세요" />
                        {quote &&
                        <DetailedVehicleCard
                            key={quote.id}
                            start={quote.start}
                            imgSrc={quote.imgSrc}
                            plateNumber={quote.plateNumber}
                            modelName={quote.modelName}
                            repairMethod={quote.repairMethod}
                            location={quote.location}
                            requestType={quote.requestType}
                            errorType={quote.errorType}
                            quoteCount={quote.quoteCount}
                            onClick={() => {}}
                        />
                        }
                    </div>

                    <div className="button-container">
                        <Button
                            onClick={() => router.push("/tabs/home")}
                            content="완료"
                            color="orange"
                        />
                    </div> 
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Status4;