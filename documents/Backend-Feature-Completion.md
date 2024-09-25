# Backend Feature Completion

```Mermaid
flowchart LR
  

  A[Client Device] -->|Request React App| B[Node.js Server]

  subgraph NodeJS / ExpressJS Server
    B -->|Serve Static Files| C[React App Files]
    B -->|API Request| D[API Router]
  end
    
    %% API Router sits above the subgraphs
    
    subgraph Navigation
      D --> E1[fa:fa-book ev-chargers]
      D --> E2[vtt]
      D --> E3[route]
      D --> E4[route-from-sentence]
    end
    
    subgraph Vehicle
      D --> F1[vehicle-data]
      D --> F2[vehicle-status]
    end
    
    subgraph Config
      D --> G1[config-get]
      D --> G2[config-update]
    end
    
    subgraph User
      D --> H1[user-info]
      D --> H2[user-settings]
    end

    subgraph Features
        direction LR
        Complete[Complete]
        Near[Near Complete]
        Progress[In Progress]
        Not[Not Started]
    end

    classDef complete fill:#008800,stroke:#333,stroke-width:2px;
    classDef nearComplete fill:#888800,stroke:#333,stroke-width:2px;
    classDef progress fill:#CC5801,stroke:#333,stroke-width:2px;
    classDef notStarted fill:#aa0000,stroke:#333,stroke-width:2px;

    class A,B,C,D,Complete complete
    class E1,Near nearComplete
    class E2,E3,E4,Progress progress
    class F1,F2,F3,G1,G2,H1,H2,Not notStarted
```