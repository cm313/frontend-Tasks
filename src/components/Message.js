
import React, { useState } from 'react';
import { Input, Button, Dropdown, Upload } from 'antd';
import { PlusOutlined, UploadOutlined, CloseCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import TextMessages from './TextMessages';

const Message = () => {
    const [inputValue, setInputValue] = useState(null);
    const [messageArray, setMessageArray] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    
     const menuItems =  [
        {
          key: 'upload',
          label: (
            <Upload
              beforeUpload={(file) => {
                setUploadedFileName(file.name);
                return false;
              }}
            >
              <span><UploadOutlined/> Upload File</span>
            </Upload>
          ),
        },
      ];
  
   
    const menu = {items: menuItems}
  
    const handleSend = () => {
      if (inputValue) {
        setMessageArray([...messageArray, inputValue]);
        setInputValue(null);
      } else if (uploadedFileName)
      {
        setMessageArray([...messageArray, uploadedFileName]);
        setUploadedFileName(null);
      }else{
        alert("Provide input");
      }
    };


    const handleKeyDown = (e)=>{
      if(inputValue){
         if(e.key === 'Enter'){
                handleSend();
         }
        }
    }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TextMessages list={messageArray}/>
      <Input style={{ flex: 1, 
      position: 'absolute',
      bottom:'10px' ,
      right: '10px',
      maxWidth: '500px',
      minWidth: '300px',
      marginLeft: '2px',
      border: '1px solid green',
      borderRadius: '10px',
      padding: '3px'
      }}
       
         value={uploadedFileName?uploadedFileName:inputValue}
        onKeyDown={(event)=>handleKeyDown(event)}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message here"
        addonAfter={
            <>
        <Button style={{paddingTop: '0px', paddingBottom: '0px'}} type="primary" onClick={""}>
            Pay Now
         </Button>
          <Dropdown menu={menu} trigger={['click']}>
            <Button icon={<PlusOutlined />} type="text" />
          </Dropdown>
          <Button type="primary" onClick={handleSend}>
          <RightCircleOutlined />
         </Button>
          </>
        }
      />
      {uploadedFileName && <CloseCircleOutlined
            style={{ cursor: 'pointer', color: 'red', position:'absolute', bottom:'3%', right:'16%', zIndex: '10'  }}
            onClick={() => setUploadedFileName(null)}
          />
      }
    </div>
  )
}

export default Message