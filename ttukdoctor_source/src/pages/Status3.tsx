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
    quoteRequestId: string;
}

  

const Status3: React.FC = () => {
    const router = useIonRouter();
    const [quoteOffer, setQuoteOffer] = useState<QuoteOffer|null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { docId } = useParams<{ docId: string }>();
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const [selectedTime, setSelectedTime] =useState<boolean[]>(new Array(21).fill(false));
    const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);
    const selectedTimeIndex = selectedTime.findIndex(v => v === true);

    const IDX = 0;

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
            const docRef = doc(db, "QuoteOffers", docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setQuoteOffer({
                    id: docSnap.id,
                    eta: data.ETA,
                    cost: data.cost,
                    repairDetail: data.repairDetail,
                    quoteRequestId: data.quoteRequestId,
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

    const getSelectedScheduleSummary = (): string | null => {
        if (!selectedDateObj || selectedTimeIndex === -1) return null;
      
        const month = selectedDateObj.getMonth() + 1;
        const date = selectedDateObj.getDate();
      
        const startTime = timeSlots[selectedTimeIndex];
        const [startHour, startMin] = startTime.split(":").map(Number);
      
        const endDate = new Date(selectedDateObj);
        endDate.setHours(startHour);
        endDate.setMinutes(startMin + 30);
      
        const endHour = String(endDate.getHours()).padStart(2, "0");
        const endMin = String(endDate.getMinutes()).padStart(2, "0");
      
        return `${month}월 ${date}일 ${startTime} ~ ${endHour}:${endMin}`;
      };

    const handleSubmit = () => {
        router.push(`/status4/${quoteOffer?.quoteRequestId}`);
    }

    const handleSelectTime = (idx: number) => {
        if(selectedTime[idx]) {
            setSelectedTime((prev) => 
                prev.map((value, index) => (index === idx ? false : value))
            )
        } else {
            setSelectedTime((prev) => 
                prev.map((value, index) => (index === idx ? true : value))
            )
        }
    }

    const generateTimeSlots = (): string[] => {
        const times: string[] = [];
        let hour = 8;
        let minute = 0;

        while (hour < 18 || (hour === 18 && minute === 0)) {
            const hh = String(hour).padStart(2, "0");
            const mm = String(minute).padStart(2, "0");
            times.push(`${hh}:${mm}`);

            minute += 30;
            if (minute === 60) {
            minute = 0;
            hour++;
            }
        }

        return times;
    };

    const timeSlots = generateTimeSlots();

    const getCurrentWeekDates = (): number[] => {
        const today = new Date(); // 오늘
        const currentDay = today.getDay(); // 요일 (0: 일요일 ~ 6: 토요일)
        const date = today.getDate(); // 오늘의 일자
      
        // 주의: 일요일(0)이면 그대로, 월요일(1)이면 -1일, ... 토요일(6)이면 -6일
        const startOfWeek = new Date(today);
        startOfWeek.setDate(date - currentDay);
      
        const weekDates: number[] = [];
      
        for (let i = 0; i < 7; i++) {
          const d = new Date(startOfWeek);
          d.setDate(startOfWeek.getDate() + i);
          weekDates.push(d.getDate());
        }
      
        return weekDates;
    }

    return (
        <IonPage>
            <IonContent>
                <div style={{gap: '4px' }} className="container" >
                    <div style={{width: '100%', height:'64px', display: 'flex', flexDirection: 'row', justifyContent:"space-between"}} > 
                        <BackButton onClick={() => router.goBack()} />
                        <CloseButton onClick={() => router.push('/tabs/home')}/>
                    </div>
                    
                    <div  style={{display: 'flex', flexDirection: 'column', gap: '8px'}}> {/*헤더 div*/}
                        <Title fontSize ={28} content="견적 현황" />
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

<div 
  className="card-button"
  style={{padding: '8px', width: '100%',  position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 12}}
  onClick={() => router.push('/garagedetailhc')}  // ✅ 여기 추가
>
  <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
    <div style={{padding: '4px 0px', display:'flex', flexDirection: 'column',gap: '2px', textAlign: 'left', justifyContent: 'center'}}>
      <div style={{color: 'black', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>
        {hardCodedData[IDX].title}
      </div>
      <div style={{display: 'flex', gap: '2px'}}>
        <span style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>
          {hardCodedData[IDX].distance}km
        </span>
        <span style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>
          {hardCodedData[IDX].location}
        </span>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px'}}>
        <svg style={{ verticalAlign: 'middle' }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.34786 0.403875C4.57186 -0.134625 5.33586 -0.134625 5.55986 0.403875L6.60086 2.90687L9.30286 3.12387C9.88486 3.17037 10.1209 3.89637 9.67736 4.27637L7.61886 6.03988L8.24736 8.67637C8.38286 9.24437 7.76536 9.69287 7.26736 9.38888L4.95386 7.97587L2.64036 9.38888C2.14236 9.69287 1.52486 9.24387 1.66036 8.67637L2.28886 6.03988L0.230359 4.27637C-0.213141 3.89637 0.0228587 3.17037 0.604859 3.12387L3.30686 2.90687L4.34786 0.403875Z" fill="#FF6F1E"/>
        </svg>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{color: 'black', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word'}}>0.0</span>
          <span style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>/5 (리뷰 0개)</span>
        </div>
        <div style={{color: '#7A7D7F', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>
          {'#' + hardCodedData[IDX].hashTag.join(' #')}
        </div>
      </div>
    </div> 
    <RightArrowButton size={20} />
  </div>
</div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}} className="content">
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            <SubTitle content="정비 금액" fontSize={20} />
                            <div style={{display: 'flex', alignItems: 'center', padding: '12px 9px', height: 40, background: 'white', overflow: 'hidden', borderRadius: 8}}>
                                <div style={{color: 'black', fontSize: 14, fontWeight: '400', wordWrap: 'break-word'}}>{quoteOffer?.cost.toLocaleString('ko-KR') + ' 원'}</div>
                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            <SubTitle content="견적 설명" fontSize={20} />
                            <div style={{display: 'flex', alignItems: 'center', padding: '12px 9px', background: 'white',  borderRadius: 8}}>
                                <div style={{color: 'black', fontSize: 14, fontWeight: '400', wordWrap: 'break-word'}}>{quoteOffer?.repairDetail}</div>
                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            <SubTitle content="소요 시간" fontSize={20} />
                            <div style={{display: 'flex', alignItems: 'center', padding: '12px 9px', background: 'white',  borderRadius: 8}}>
                                <div style={{color: 'black', fontSize: 14, fontWeight: '400', wordWrap: 'break-word'}}>{`${quoteOffer?.eta.day} 일 ${quoteOffer?.eta.hour} 시간`}</div>
                            </div>
                        </div>
                        
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            <SubTitle content="일정 선택" fontSize={20} />
                            <div className="calendar-grid">
                                {getCurrentWeekDates().map((day,idx) => (
                                    <div onClick={() => {
                                        const today = new Date();
                                        const currentDay = today.getDay();
                                        const date = today.getDate();
                                        const startOfWeek = new Date(today);
                                        startOfWeek.setDate(date - currentDay);
                                        const newDate = new Date(startOfWeek);
                                        newDate.setDate(startOfWeek.getDate() + idx);
                                        setSelectedDay(day);
                                        setSelectedDateObj(newDate);
                                      }} style={{aspectRatio: '1/1', height: '50px'}}key={day} className = {`calendar-cell ${selectedDay == day? "selected": ""} ${idx === 6 ? "holiday" : ""}`} >
                                        <div className="calendar-day-number">{day}</div>
                                        <div className="divider" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div
                            className="day-calendar-grid"
                        >
                        
                        {timeSlots.map((time, idx) => (
                            <div key={idx} className={`day-calendar-cell ${selectedTime[idx] ? "selected": ""}`}
                            onClick={() => handleSelectTime(idx)}>
                            {time}
                            </div>
                        ))}
                        </div>

                    </div>  

                    <div style={{paddingTop: '16px'}}className="button-container">
                        <Button content="견적 수락하기" color="orange" onClick={handleSubmit} />
                    </div> 
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Status3;