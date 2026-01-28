import React, { useState } from 'react'
import { Segmented, Tabs } from 'antd';

const onChange = key => {
  console.log(key);
};

const items = [
  { key: '1', label: 'Tất cả', children: 'Tất cả các thú vui bạn muốn' },
  { key: '2', label: 'Len', children: 'Hàng chất lượng cao, bền bỉ, đẹp mắt' },
  { key: '3', label: 'Hoa bó', children: 'Hoa bó từ bông nhỏ, rất tỉ mỉ' },
  { key: '4', label: 'Móc', children: 'Các loại tay móc' },
  { key: '5', label: 'Quà tặng', children: 'Quà tặng ngoan xinh yêu cho bé yêu' },
  { key: '6', label: 'Trang trí', children: 'Charm, móc khoá, dây tóc bla bla...' },
];

const CategoryList = () => {

  const [alignValue, setAlignValue] = useState('center');

  return (

    <>

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicator={{ size: origin => origin - 20, align: alignValue }}
        className='d-flex align-items-center fw-bold my-2'
      />
    </>
  )
}

export default CategoryList