```mermaid 
flowchart TD

			Start/EndLogin([Login]) -->|Enter Credentials| ProcessDashboard(Dashboard)
			

			ProcessDashboard --> ProcessBank(Bank)
			

			ProcessBank --> DecisionIsBankAccount{Is Bank Account}
			

			DecisionIsBankAccount -->|Yes| Input/OutputDataEntry[/Data Entry/]
			

			Input/OutputDataEntry --> ProcessTransaction(Transaction)
			

			ProcessTransaction --> Start/EndEnd([End])
			

			DecisionIsBankAccount -->|No| Start/EndCreateBank([Create Bank])
			

			Start/EndCreateBank --> Input/OutputDataEntry
			
