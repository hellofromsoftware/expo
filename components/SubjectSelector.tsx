import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SUBJECT_CATEGORIES = {
  'Academic - Mathematics': [
    'Mathematics', 'Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry',
    'Applied Mathematics', 'Pure Mathematics', 'Further Mathematics'
  ],
  'Academic - Sciences': [
    'Physics', 'Chemistry', 'Biology', 'Environmental Science', 'Earth Science',
    'Astronomy', 'Computer Science', 'Information Technology', 'Engineering'
  ],
  'Academic - Languages': [
    'English', 'English Literature', 'Creative Writing', 'Spanish', 'French',
    'German', 'Italian', 'Mandarin', 'Japanese', 'Arabic', 'Hindi', 'Portuguese'
  ],
  'Academic - Humanities': [
    'History', 'Geography', 'Philosophy', 'Psychology', 'Sociology',
    'Political Science', 'Economics', 'Business Studies', 'Accounting', 'Law'
  ],
  'Academic - Arts': [
    'Art', 'Drawing', 'Painting', 'Sculpture', 'Photography', 'Graphic Design',
    'Drama', 'Theatre Studies', 'Film Studies', 'Media Studies'
  ],
  'Music - Instruments': [
    'Piano', 'Guitar', 'Violin', 'Drums', 'Bass Guitar', 'Saxophone', 'Flute',
    'Trumpet', 'Clarinet', 'Cello', 'Ukulele', 'Harmonica', 'Voice/Singing'
  ],
  'Music - Theory': [
    'Music Theory', 'Music Composition', 'Music Production', 'Sound Engineering',
    'Music History', 'Jazz Studies', 'Classical Music'
  ],
  'Languages - Spoken': [
    'English Speaking', 'IELTS Preparation', 'TOEFL Preparation', 'Spanish Conversation',
    'French Conversation', 'German Conversation', 'Business English', 'Academic English'
  ],
  'Hobbies - Crafts': [
    'Cooking', 'Baking', 'Sewing', 'Knitting', 'Crochet', 'Embroidery',
    'Pottery', 'Woodworking', 'Jewelry Making', 'Candle Making'
  ],
  'Hobbies - Sports & Fitness': [
    'Yoga', 'Pilates', 'Dance', 'Swimming', 'Tennis', 'Football', 'Basketball',
    'Martial Arts', 'Boxing', 'Personal Training', 'Nutrition'
  ],
  'Professional Skills': [
    'Public Speaking', 'Presentation Skills', 'Leadership', 'Time Management',
    'Project Management', 'Digital Marketing', 'Social Media', 'Excel', 'PowerPoint'
  ],
  'Test Preparation': [
    'SAT Preparation', 'GCSE Preparation', 'A-Level Preparation', 'University Entrance',
    'Graduate Entrance Exams', 'Professional Certifications'
  ]
};

export default function SubjectSelector({ selectedSubjects, onSubjectsChange, label, placeholder }) {
  const [customSubject, setCustomSubject] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const addSubject = (subject) => {
    const trimmedSubject = subject.trim();
    if (trimmedSubject && !selectedSubjects.includes(trimmedSubject)) {
      onSubjectsChange([...selectedSubjects, trimmedSubject]);
    }
  };

  const removeSubject = (subject) => {
    onSubjectsChange(selectedSubjects.filter(s => s !== subject));
  };

  const addCustomSubject = () => {
    if (customSubject.trim()) {
      addSubject(customSubject);
      setCustomSubject('');
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
  
  const renderSubjectButtons = () => {
    if (!selectedCategory) {
      return Object.keys(SUBJECT_CATEGORIES).map(category => (
        <TouchableOpacity
          key={category}
          style={styles.modalCategoryButton}
          onPress={() => handleSelectCategory(category)}
        >
          <Text style={styles.modalCategoryText}>{category}</Text>
        </TouchableOpacity>
      ));
    }
    
    return SUBJECT_CATEGORIES[selectedCategory].map(subject => {
      const isSelected = selectedSubjects.includes(subject);
      return (
        <TouchableOpacity
          key={subject}
          style={[
            styles.modalSubjectButton,
            isSelected && styles.modalSubjectButtonSelected,
          ]}
          onPress={() => {
            if (isSelected) {
              removeSubject(subject);
            } else {
              addSubject(subject);
            }
          }}
        >
          <Text style={[
            styles.modalSubjectText,
            isSelected && styles.modalSubjectTextSelected,
          ]}>{subject}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* Category Dropdown Button */}
      <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>
          {selectedCategory ? `Category: ${selectedCategory}` : 'Select a category...'}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>
      
      {/* Custom Subject Input */}
      <View style={styles.customInputContainer}>
        <TextInput
          style={styles.customInput}
          placeholder={placeholder || "Add custom subject"}
          value={customSubject}
          onChangeText={setCustomSubject}
          onSubmitEditing={addCustomSubject}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addCustomSubject}
          disabled={!customSubject.trim()}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Selected Subjects */}
      {selectedSubjects.length > 0 && (
        <View style={styles.selectedSubjectsContainer}>
          <Text style={styles.selectedSubjectsLabel}>Selected subjects:</Text>
          <View style={styles.badgeContainer}>
            {selectedSubjects.map(subject => (
              <View key={subject} style={styles.badge}>
                <Text style={styles.badgeText}>{subject}</Text>
                <TouchableOpacity onPress={() => removeSubject(subject)} style={styles.badgeRemoveButton}>
                  <Text style={styles.badgeRemoveText}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Modal for subject selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedCategory(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedCategory || 'Select a Category'}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (selectedCategory) {
                    setSelectedCategory(null);
                  } else {
                    setModalVisible(false);
                  }
                }}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseText}>{selectedCategory ? 'Back' : 'Close'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {renderSubjectButtons()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownIcon: {
    fontSize: 16,
    color: '#aaa',
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  customInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 48,
    height: 48,
    marginLeft: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
    lineHeight: 28,
  },
  selectedSubjectsContainer: {
    marginBottom: 16,
  },
  selectedSubjectsLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    marginRight: 4,
  },
  badgeRemoveButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeRemoveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#007bff',
  },
  modalBody: {
    paddingVertical: 8,
  },
  modalCategoryButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  modalCategoryText: {
    fontSize: 16,
  },
  modalSubjectButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  modalSubjectButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  modalSubjectText: {
    fontSize: 14,
    color: '#333',
  },
  modalSubjectTextSelected: {
    color: 'white',
  },
});
