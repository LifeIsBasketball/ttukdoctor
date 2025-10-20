// GarageDetailHC.tsx
import React, { useState } from 'react';
import { IonPage, IonContent, IonModal, IonTextarea, IonItem, IonLabel, IonButton } from '@ionic/react';
import './GarageDetailHC.css';
import { BackButton, CloseButton } from "../beta_app/Buttons";

const GarageDetailHC: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'review' | 'repair' | 'etc'>('info');
  const [showModal, setShowModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const garage = {
    name: "OO건설기계정비",
    address: "대구 안심로 13길 OOO",
    phone: "053-123-0000",
    description: "20년 경력의 건설기계 전문 정비소입니다.",
    mainServices: ['굴삭기', '전자제어엔진', '유압펌프']
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="info-card">
            <div className="info-item"><span className="icon">📍</span>{garage.address}</div>
            <div className="info-item"><span className="icon">⏰</span>
              <div>
                <p>월~금 08:00~18:00</p>
                <p>토~일 휴무</p>
              </div>
            </div>
            <div className="info-item"><span className="icon">☎️</span>{garage.phone}</div>
            <div className="info-item"><span className="icon">🔧</span>{garage.mainServices.join(', ')}</div>
            <div className="info-item"><span className="icon">📝</span>{garage.description}</div>
          </div>
        );
      default:
        return <div className="empty-tab">해당 탭에 표시할 정보가 없습니다.</div>;
    }
  };

  return (
    <IonPage>
      <IonContent className="garage-detail-content">
        <div className="header">
          <div className="header-buttons">
            <BackButton onClick={() => window.history.back()} />
            <CloseButton onClick={() => window.location.href = '/'} />
          </div>
          <img src="/repairShop.png" alt="정비소" className="garage-image" />
          <h1 className="title">{garage.name}</h1>
          <div className="tags">{garage.mainServices.join(', ')}</div>
          <div className="rating"><span className="star">★</span> 0/5 (리뷰 0)</div>
        </div>

        <div className="tab-bar">
          <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>업체 정보</button>
          <button className={`tab ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')}>리뷰/평점</button>
          <button className={`tab ${activeTab === 'repair' ? 'active' : ''}`} onClick={() => setActiveTab('repair')}>정비 내역</button>
          <button className={`tab ${activeTab === 'etc' ? 'active' : ''}`} onClick={() => setActiveTab('etc')}>기타정보</button>
        </div>

        {renderTabContent()}

        {activeTab === 'info' && (
          <IonButton expand="full" color="medium" onClick={() => setShowModal(true)}>
            피드백 보내기
          </IonButton>
        )}

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent className="ion-padding">
            <h2>정비소 정보 피드백</h2>
            <IonItem>
              <IonLabel position="stacked">잘못된 정보 또는 수정 요청</IonLabel>
              <IonTextarea
                value={feedbackMsg}
                onInput={(e: any) => setFeedbackMsg(e.target.value)}
                placeholder="예: 위치가 다릅니다. 연락처가 틀렸어요."
              />
            </IonItem>
            <IonButton expand="full" onClick={() => { alert('✅ 피드백이 저장되었습니다.'); setShowModal(false); setFeedbackMsg(''); }}>
              피드백 전송
            </IonButton>
            <IonButton expand="full" color="light" onClick={() => setShowModal(false)}>
              닫기
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default GarageDetailHC;