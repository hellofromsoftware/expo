import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DEGREE_TYPES = [
  'High School Diploma',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate/PhD',
  'Professional Certificate',
  'Diploma',
  'GCSE',
  'A-Level',
  'IB Diploma',
  'Professional License',
  'Industry Certification',
  'Online Course Certificate',
  'Bootcamp Certificate',
  'Other'
];

const GRADUATION_YEARS = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 5; year >= currentYear - 50; year--) {
    years.push(year.toString());
  }
  return years;
};

// Custom Select component using a modal
const CustomSelect = ({ placeholder, value, onValueChange, options }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    onValueChange(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.input}>
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

export default function EducationManager({
  educations = [],
  onEducationsChange
}) {
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    field: ''
  });

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      const education = {
        id: Date.now().toString(),
        ...newEducation
      };

      onEducationsChange([...educations, education]);
      setNewEducation({ degree: '', institution: '', year: '', field: '' });
    }
  };

  const removeEducation = (educationId) => {
    onEducationsChange(educations.filter(edu => edu.id !== educationId));
  };

  const updateNewEducation = (field, value) => {
    setNewEducation(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Educational Background</Text>
        <Text style={styles.sectionDescription}>
          Add your educational qualifications and certifications
        </Text>
      </View>

      {/* Add New Education Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>+ Add Education</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Degree/Qualification*</Text>
            <CustomSelect
              placeholder="Select degree type"
              value={newEducation.degree}
              onValueChange={(value) => updateNewEducation('degree', value)}
              options={DEGREE_TYPES}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Institution/School*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., University of Oxford"
              value={newEducation.institution}
              onChangeText={(text) => updateNewEducation('institution', text)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Year of Graduation*</Text>
            <CustomSelect
              placeholder="Select year"
              value={newEducation.year}
              onValueChange={(value) => updateNewEducation('year', value)}
              options={GRADUATION_YEARS()}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Field of Study</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Computer Science, Mathematics"
              value={newEducation.field}
              onChangeText={(text) => updateNewEducation('field', text)}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, (!newEducation.degree || !newEducation.institution || !newEducation.year) && styles.buttonDisabled]}
            onPress={addEducation}
            disabled={!newEducation.degree || !newEducation.institution || !newEducation.year}
          >
            <Text style={styles.buttonText}>+ Add Education</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Current Education List */}
      {educations.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🎓 Your Education ({educations.length})</Text>
          </View>
          <View style={styles.cardContent}>
            {educations.map(education => (
              <View key={education.id} style={styles.educationItem}>
                <View style={styles.educationDetails}>
                  <Text style={styles.educationDegree}>{education.degree}</Text>
                  <Text style={styles.educationInstitution}>
                    {education.institution} • {education.year}
                  </Text>
                  {education.field && (
                    <Text style={styles.educationField}>
                      Field: {education.field}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => removeEducation(education.id)}>
                  <Text style={styles.removeButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {educations.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No education added yet</Text>
          <Text style={styles.emptyStateSubtext}>Add your first qualification above</Text>
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
  input: {
    backgroundColor: '#f1f3f5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    height: 40,
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
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#e9ecef',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  educationDetails: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  educationInstitution: {
    fontSize: 12,
    color: '#6c757d',
  },
  educationField: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
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
  // Custom Select Styles
  selectTrigger: {
    flex: 1,
    justifyContent: 'center',
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
    width: '80%',
    maxHeight: '60%',
  },
  selectItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  selectItemText: {
    fontSize: 16,
  },
});
