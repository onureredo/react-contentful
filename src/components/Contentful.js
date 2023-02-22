import React, { useEffect, useState } from 'react';
import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCSESS_TOKEN,
});

function Contentful2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .getEntries()
      .then((response) => {
        // console.log(response);
        setData(response.items);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.sys.id}>
          <h2>{item.fields.title}</h2>
          <p>{item.fields.shortDescription}</p>
          <img
            src={item.fields.image.fields.file.url}
            alt={item.fields.image.fields.title}
          />
          <p>{item.fields.longDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default Contentful2;
