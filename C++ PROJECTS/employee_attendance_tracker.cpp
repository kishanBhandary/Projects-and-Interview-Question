#include <iostream>
#include <fstream>
#include <vector>
#include <iomanip>
using namespace std;

struct Attendance {
    int empID;
    string name;
    string date;
    string status; // Present or Absent
};

vector<Attendance> records;

void saveToFile() {
    ofstream file("attendance.txt");
    for (auto &r : records)
        file << r.empID << " " << r.name << " " << r.date << " " << r.status << "\n";
    file.close();
}

void loadFromFile() {
    ifstream file("attendance.txt");
    Attendance r;
    while (file >> r.empID >> r.name >> r.date >> r.status)
        records.push_back(r);
    file.close();
}

void markAttendance() {
    Attendance r;
    cout << "Enter Employee ID: ";
    cin >> r.empID;
    cout << "Enter Name: ";
    cin >> r.name;
    cout << "Enter Date (DD-MM-YYYY): ";
    cin >> r.date;
    cout << "Enter Status (Present/Absent): ";
    cin >> r.status;
    records.push_back(r);
    saveToFile();
    cout << "✅ Attendance marked successfully!\n";
}

void viewAttendance() {
    cout << "\nEmpID   Name       Date         Status\n";
    cout << "--------------------------------------\n";
    for (auto &r : records)
        cout << setw(6) << r.empID << setw(10) << r.name << setw(13) << r.date 
             << setw(10) << r.status << "\n";
}

void searchByDate() {
    string date;
    cout << "Enter date to view (DD-MM-YYYY): ";
    cin >> date;
    cout << "\nAttendance for " << date << ":\n";
    for (auto &r : records)
        if (r.date == date)
            cout << r.empID << " - " << r.name << " - " << r.status << "\n";
}

int main() {
    loadFromFile();
    int choice;
    do {
        cout << "\n--- Employee Attendance Tracker ---\n";
        cout << "1. Mark Attendance\n2. View All Records\n3. Search by Date\n4. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;
        switch (choice) {
            case 1: markAttendance(); break;
            case 2: viewAttendance(); break;
            case 3: searchByDate(); break;
            case 4: cout << "Exiting...\n"; break;
            default: cout << "Invalid choice!\n";
        }
    } while (choice != 4);
    return 0;
}
