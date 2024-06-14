// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RevealSdkSettings, RevealViewOptions } from '@revealbi/ui';
import { RevealView, RevealViewRef } from '@revealbi/ui-react';
import { useRef, useState } from 'react';
import styles from './app.module.scss';

export function App() {

  const rvRef = useRef<RevealViewRef>(null);
  
  RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
  //RevealSdkSettings.serverUrl = "http://localhost:5111";

  const [dashboard, setDashboard] = useState<string>("Campaigns");

  const options: RevealViewOptions = {
    dataSources: [
      { type: "REST", title: "Sales by Category", subtitle: "Excel2Json", url: "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9" },
    ],
    header: {
      menu: {
        items: [
          { title: "Item 1", click: () => console.log(rvRef.current?.getRVDashboard())},
          { title: "Item 2", click: () => alert("Item 2") },
          { title: "Item 3", click: () => alert("Item 3") },
        ]
      }
    },
  }

  const onInitialized = () => {
    if(rvRef.current) {
      const filter = rvRef.current.filters?.getByTitle("CampaignID");
      if (filter) {
          filter.selectedValues = ["Diamond", "Ruby"];
      }   
    }
  }

  
  return (
    <div style={{height: '100%'}}>
      <RevealView ref={rvRef} dashboard={dashboard} options={options} onInitialized={onInitialized} ></RevealView>
    </div>
  );
}

export default App;
