```mermaid 
flowchart LR

			Start/EndLogin([Login]) --> ProcessDashboard(Dashboard)
			

			ProcessDashboard --> ProcessBank(Bank)
			

			ProcessBank --> DecisionIsBankExists{Is Bank Exists}
			

			DecisionIsBankExists -->|Yes| Input/OutputDataEntry[/Data Entry/]
			

			Input/OutputDataEntry --> ProcessTransaction(Transaction)
			

			ProcessTransaction --> Start/EndEnd([End])
			

			DecisionIsBankExists -->|No| Input/OutputCreateBank[/Create Bank/]
			

			Input/OutputCreateBank --> Input/OutputDataEntry
			
