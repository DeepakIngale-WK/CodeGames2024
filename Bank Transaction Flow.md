```mermaid 
flowchart TD

			Start/EndLogin([Login]) -->|Enter Credentials| ProcessDashboard(Dashboard)
			

			ProcessDashboard --> ProcessBank(Bank)
			

			ProcessBank --> DecisionIsBankExists{Is Bank Exists}
			

			DecisionIsBankExists -->|Yes| Input/OutputDataEntry[/Data Entry/]
			

			Input/OutputDataEntry --> ProcessTransaction(Transaction)
			

			ProcessTransaction --> Start/EndEnd([End])
			

			DecisionIsBankExists -->|No| ProcessAddBank(Add Bank)
			

			ProcessAddBank --> Input/OutputDataEntry
			
