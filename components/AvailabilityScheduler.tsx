import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(timeString);
    }
  }
  return options;
};

// Custom Select component using a modal for a clean UI
const CustomSelect = ({ placeholder, value, onValueChange, options }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    onValueChange(item);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selectTrigger}
        onPress={() => setModalVisible(true)}
      >
        <Text style={value ? styles.selectValueText : styles.placeholderText}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.selectItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.selectItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function AvailabilityScheduler({
  availability = [],
  onAvailabilityChange
}) {
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: '',
    startTime: '',
    endTime: ''
  });

  const timeOptions = generateTimeOptions();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const addSlot = () => {
    if (newSlot.dayOfWeek && newSlot.startTime && newSlot.endTime) {
      if (newSlot.startTime >= newSlot.endTime) {
        alert('End time must be after start time');
        return;
      }

      const slot = {
        id: Date.now().toString(),
        dayOfWeek: newSlot.dayOfWeek,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime
      };

      onAvailabilityChange([...availability, slot]);
      setNewSlot({ dayOfWeek: '', startTime: '', endTime: '' });
    }
  };

  const removeSlot = (slotId) => {
    onAvailabilityChange(availability.filter(slot => slot.id !== slotId));
  };

  const groupSlotsByDay = () => {
    const grouped = {};
    availability.forEach(slot => {
      if (!grouped[slot.dayOfWeek]) {
        grouped[slot.dayOfWeek] = [];
      }
      grouped[slot.dayOfWeek].push(slot);
    });

    Object.keys(grouped).forEach(day => {
      grouped[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return grouped;
  };

  const groupedSlots = groupSlotsByDay();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Teaching Availability</Text>
        <Text style={styles.sectionDescription}>
          Set up to 20 time slots when you're available for teaching
        </Text>
      </View>

      {/* Add New Slot */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>+ Add Time Slot</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Day of Week</Text>
            <CustomSelect
              placeholder="Select day"
              value={newSlot.dayOfWeek}
              onValueChange={(value) => setNewSlot(prev => ({ ...prev, dayOfWeek: value }))}
              options={DAYS_OF_WEEK}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Time</Text>
            <CustomSelect
              placeholder="Start time"
              value={newSlot.startTime}
              onValueChange={(value) => setNewSlot(prev => ({ ...prev, startTime: value }))}
              options={timeOptions.map(formatTime)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>End Time</Text>
            <CustomSelect
              placeholder="End time"
              value={newSlot.endTime}
              onValueChange={(value) => setNewSlot(prev => ({ ...prev, endTime: value }))}
              options={timeOptions.map(formatTime)}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, (!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime || availability.length >= 20) && styles.buttonDisabled]}
            onPress={addSlot}
            disabled={!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime || availability.length >= 20}
          >
            <Text style={styles.buttonText}>
              + Add Time Slot {availability.length >= 20 && '(Maximum reached)'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Current Schedule */}
      {availability.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>⏰ Your Schedule ({availability.length}/20)</Text>
          </View>
          <View style={styles.cardContent}>
            {DAYS_OF_WEEK.map(day => {
              const daySlots = groupedSlots[day];
              if (!daySlots || daySlots.length === 0) return null;

              return (
                <View key={day} style={styles.dayGroup}>
                  <Text style={styles.dayHeading}>{day}</Text>
                  <View style={styles.slotsContainer}>
                    {daySlots.map(slot => (
                      <View key={slot.id} style={styles.slotItem}>
                        <View style={styles.slotInfo}>
                          <Text style={styles.slotTimeText}>
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeSlot(slot.id)}
                        >
                          <Text style={styles.removeButtonText}>🗑️</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {availability.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No availability slots added yet</Text>
          <Text style={styles.emptyStateSubtext}>Add your first time slot above</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6c757d',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#495057',
  },
  selectTrigger: {
    backgroundColor: '#f1f3f5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    justifyContent: 'center',
    height: 40,
  },
  selectValueText: {
    color: '#212529',
  },
  placeholderText: {
    color: '#6c757d',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: width * 0.8,
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  selectItemText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#adb5bd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dayGroup: {
    marginBottom: 16,
  },
  dayHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  slotsContainer: {
    paddingLeft: 8,
  },
  slotItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotTimeText: {
    fontSize: 14,
    color: '#212529',
  },
  removeButton: {
    marginLeft: 10,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#dc3545',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6c757d',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#6c757d',
  },
});
