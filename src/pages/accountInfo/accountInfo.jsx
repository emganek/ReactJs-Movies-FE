import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import AccountInfo from '../../modules/accountInfo/accountInfo';
import BookingHistory from '../../modules/bookingHistory/bookingHistory';
import './index.css';

const { TabPane } = Tabs;
const onChange = (key) => {

};

export default function AccountInfoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id='account-info'>
      <Tabs className='mx-auto' defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Account Infomation" key="1">
          <AccountInfo />
        </TabPane>
        <TabPane tab="Booking History" key="2">
          <BookingHistory />
        </TabPane>
      </Tabs>
    </section>
  )
}
